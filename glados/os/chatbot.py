import torch
import numpy as np
from utils.tools import prepare_text
from scipy.io.wavfile import write
import time
import tempfile
import subprocess
from pydub import AudioSegment
from pydub.playback import play
from nltk import download
from nltk.tokenize import sent_tokenize
from sys import modules as mod
from transformers import GPT2LMHeadModel, GPT2Tokenizer

try:
    import winsound
except ImportError:
    from subprocess import call

print("Initializing GLaDOS TTS Engine...")

kwargs = {
    'stdout': subprocess.PIPE,
    'stderr': subprocess.PIPE,
    'stdin': subprocess.PIPE
}

class TTSRunner:
    def __init__(self, use_p1: bool=False, log: bool=False):
        self.log = log
        if use_p1:
            self.emb = torch.load('models/emb/glados_p1.pt')
        else:
            self.emb = torch.load('models/emb/glados_p2.pt')
        
        # Select the device
        if torch.cuda.is_available():
            self.device = 'cuda'
        elif torch.is_vulkan_available():
            self.device = 'vulkan'
        else:
            self.device = 'cpu'

        # Load models
        self.glados = torch.jit.load('models/glados-new.pt')
        self.vocoder = torch.jit.load('models/vocoder-gpu.pt', map_location=self.device)
        
        # Initialize models
        for i in range(2):
            init = self.glados.generate_jit(prepare_text(str(i)), self.emb, 1.0)
            init_mel = init['mel_post'].to(self.device)
            init_vo = self.vocoder(init_mel)

    def run_tts(self, text, alpha: float=1.0) -> AudioSegment:
        x = prepare_text(text)

        with torch.no_grad():
            # Generate TTS output
            if self.log:
                start_time = time.time()
            tts_output = self.glados.generate_jit(x, self.emb, alpha)
            if self.log:
                print(f"Forward Tacotron took {(time.time() - start_time) * 1000:.2f}ms")

            # Use vocoder to generate audio
            if self.log:
                start_time = time.time()
            mel = tts_output['mel_post'].to(self.device)
            audio = self.vocoder(mel)
            if self.log:
                print(f"HiFiGAN took {(time.time() - start_time) * 1000:.2f}ms")

            # Normalize audio
            audio = audio.squeeze() * 32768.0
            audio = audio.cpu().numpy().astype('int16')
            output_file = tempfile.TemporaryFile()
            write(output_file, 22050, audio)
            sound = AudioSegment.from_wav(output_file)
            output_file.close()
            return sound

    def speak_one_line(self, audio, name: str):
        audio.export(name, format="wav")
        if 'winsound' in mod:
            winsound.PlaySound(name, winsound.SND_FILENAME | winsound.SND_ASYNC)
        else:
            try:
                subprocess.Popen(["play", name], **kwargs)
            except FileNotFoundError:
                try:
                    subprocess.Popen(["aplay", name], **kwargs)
                except FileNotFoundError:
                    subprocess.Popen(["pw-play", name], **kwargs)

    def speak(self, text, alpha: float=1.0, delay: float=0.1):
        download('punkt', quiet=self.log)
        sentences = sent_tokenize(text)
        if not sentences:
            return

        # Speak the first sentence immediately
        audio = self.run_tts(sentences[0])
        pause = AudioSegment.silent(duration=delay)
        self.speak_one_line(audio + pause, "response.wav")

        # Speak the remaining sentences with delays
        for sentence in sentences[1:]:
            audio = self.run_tts(sentence)
            time.sleep(delay)
            self.speak_one_line(audio + pause, "response.wav")

class GladosChatbot:
    def __init__(self):
        print("Loading GPT-2 model for GLaDOS responses...")
        self.model = GPT2LMHeadModel.from_pretrained("gpt2")
        self.tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
        self.tts = TTSRunner(log=True)
        self.greet()

    def greet(self):
        greeting = "Hello, test subject. How may I assist you?"
        print("GLaDOS:", greeting)
        self.tts.speak(greeting)

    def generate_response(self, input_text):
        # Prepare the input with a GLaDOS-like prompt
        prompt = f"User: {input_text}\nGLaDOS:"
        inputs = self.tokenizer.encode(prompt, return_tensors="pt")
        
        # Generate a response
        outputs = self.model.generate(
            inputs,
            max_length=150,
            num_return_sequences=1,
            no_repeat_ngram_size=2,
            temperature=0.7,
            top_p=0.9,
            eos_token_id=self.tokenizer.eos_token_id
        )
        
        # Decode the response and clean it up
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        response = response.split("GLaDOS:")[-1].strip()
        return response

    def chat(self):
        while True:
            try:
                user_input = input("You: ")
                if user_input.lower() in ['exit', 'quit']:
                    farewell = "Goodbye. I'll be here when you're ready for more testing."
                    print("GLaDOS:", farewell)
                    self.tts.speak(farewell)
                    break
                response = self.generate_response(user_input)
                print("GLaDOS:", response)
                self.tts.speak(response)
            except (KeyboardInterrupt, EOFError):
                farewell = "Goodbye. I'll be here when you're ready for more testing."
                print("\nGLaDOS:", farewell)
                self.tts.speak(farewell)
                break

if __name__ == "__main__":
    chatbot = GladosChatbot()
    chatbot.chat()
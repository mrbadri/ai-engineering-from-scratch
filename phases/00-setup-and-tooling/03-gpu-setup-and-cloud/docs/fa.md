# راه‌اندازی GPU و رایانش ابری

> آموزش روی CPU برای یادگیری کافی است؛ آموزش جدی به GPU نیاز دارد.

**Type:** ساخت
**Languages:** Python
**Prerequisites:** فاز 0، درس 01
**Time:** حدود 45 دقیقه

## اهداف یادگیری

- دسترسی به local GPU (GPU محلی) را با `nvidia-smi` و CUDA API در PyTorch بررسی کنید
- Google Colab را با یک T4 GPU برای cloud experimentهای رایگان (آزمایش‌های ابری) پیکربندی کنید
- ضرب ماتریسی را روی CPU و GPU با benchmark (معیارسنجی) بسنجید و speedup (افزایش سرعت) را اندازه بگیرید
- با استفاده از rule of thumb (قاعدهٔ سرانگشتی) `fp16`، بزرگ‌ترین مدلی را که در VRAM جا می‌شود برآورد کنید

## مسئله

بیشتر درس‌های فازهای 1 تا 3 روی CPU به‌خوبی اجرا می‌شوند. اما وقتی آموزش CNNها، transformerها یا LLMها را شروع کنید (فازهای 4 به بعد)، به GPU acceleration (شتاب‌دهی GPU) نیاز دارید. یک training run (اجرای آموزش) که روی CPU، 8 ساعت طول می‌کشد، روی GPU در 10 دقیقه تمام می‌شود.

سه گزینه دارید: local GPU، cloud GPU (GPU ابری) یا Google Colab (رایگان).

## مفهوم

```
گزینه‌های شما:

1. local NVIDIA GPU (GPU محلی NVIDIA)
   هزینه: $0 (از قبل آن را دارید)
   setup (راه‌اندازی): نصب CUDA + cuDNN
   مناسب برای: استفادهٔ منظم، datasetهای بزرگ (مجموعه‌داده‌های بزرگ)

2. Google Colab (سطح رایگان)
   هزینه: $0
   setup: ندارد
   مناسب برای: quick experimentها (آزمایش‌های سریع)، وقتی در خانه GPU ندارید

3. cloud GPU (GPU ابری) — Lambda, RunPod, Vast.ai
   هزینه: $0.20-2.00/hr
   setup: SSH + نصب
   مناسب برای: serious training (آموزش جدی)، مدل‌های بزرگ
```

## آن را بسازید

### گزینه 1: local NVIDIA GPU (GPU محلی NVIDIA)

بررسی کنید local GPU دارید یا نه:

```bash
nvidia-smi
```

PyTorch را با CUDA نصب کنید:

```python
import torch

print(f"CUDA available: {torch.cuda.is_available()}")
print(f"CUDA version: {torch.version.cuda}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"Memory: {torch.cuda.get_device_properties(0).total_memory / 1e9:.1f} GB")
```

### گزینه 2: Google Colab

1. به [colab.research.google.com](https://colab.research.google.com) بروید
2. از مسیر `Runtime > Change runtime type > T4 GPU`، نوع runtime را به T4 GPU تغییر دهید
3. برای بررسی، `!nvidia-smi` را اجرا کنید

notebookهای این دوره را مستقیماً در Colab بارگذاری کنید.

### گزینه 3: cloud GPU (GPU ابری)

برای Lambda Labs، RunPod یا Vast.ai:

```bash
ssh user@your-gpu-instance

pip install torch torchvision torchaudio
python -c "import torch; print(torch.cuda.get_device_name(0))"
```

### GPU ندارید؟ مشکلی نیست.

بیشتر درس‌ها با CPU اجرا می‌شوند. درس‌هایی که به GPU نیاز دارند، این موضوع را اعلام می‌کنند و لینک‌های Colab را در اختیار می‌گذارند.

```python
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using: {device}")
```

## آن را بسازید: GPU در برابر CPU با benchmark

```python
import torch
import time

size = 5000

a_cpu = torch.randn(size, size)
b_cpu = torch.randn(size, size)

start = time.time()
c_cpu = a_cpu @ b_cpu
cpu_time = time.time() - start
print(f"CPU: {cpu_time:.3f}s")

if torch.cuda.is_available():
    a_gpu = a_cpu.to("cuda")
    b_gpu = b_cpu.to("cuda")

    torch.cuda.synchronize()
    start = time.time()
    c_gpu = a_gpu @ b_gpu
    torch.cuda.synchronize()
    gpu_time = time.time() - start
    print(f"GPU: {gpu_time:.3f}s")
    print(f"Speedup: {cpu_time / gpu_time:.0f}x")
```

## تمرین‌ها

1. benchmark بالا را اجرا کنید و زمان‌های CPU و GPU را مقایسه کنید
2. اگر GPU ندارید، آن را روی Google Colab اجرا و نتایج را مقایسه کنید
3. مقدار حافظهٔ GPU خود را بررسی کنید و بزرگ‌ترین مدلی را که می‌توانید در آن جا دهید برآورد کنید (rule of thumb: برای هر پارامتر در `fp16`، 2 بایت)

## واژگان کلیدی

| اصطلاح | چیزی که مردم می‌گویند | معنای واقعی |
|------|----------------|------|
| CUDA | «برنامه‌نویسی GPU» | NVIDIA parallel computing platform (سکوی محاسبات موازی NVIDIA) که امکان اجرای کد روی GPU را فراهم می‌کند |
| VRAM | «GPU memory» | video memory (حافظهٔ ویدیویی) روی GPU که از system RAM جداست و اندازهٔ مدل را محدود می‌کند |
| fp16 | «half precision» | 16-bit floating point (عدد ممیز شناور 16 بیتی) که با افت دقت اندک، نصف fp32 حافظه مصرف می‌کند |
| Tensor Core | «سخت‌افزار سریع ماتریس» | هسته‌های تخصصی GPU برای ضرب ماتریسی که 4 تا 8 برابر از هسته‌های معمولی سریع‌ترند |

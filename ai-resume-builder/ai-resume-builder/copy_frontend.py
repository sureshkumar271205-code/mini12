import os
import shutil

src = r"c:\Users\23IT025\Downloads\ai-resume-builder\ai-resume-builder\frontend\dist"
dst = r"c:\Users\23IT025\Downloads\ai-resume-builder\ai-resume-builder\backend\src\main\resources\static"

if not os.path.exists(dst):
    os.makedirs(dst)

for item in os.listdir(src):
    s = os.path.join(src, item)
    d = os.path.join(dst, item)
    if os.path.isdir(s):
        if os.path.exists(d):
            shutil.rmtree(d)
        shutil.copytree(s, d)
    else:
        shutil.copy2(s, d)

print("Copy complete")

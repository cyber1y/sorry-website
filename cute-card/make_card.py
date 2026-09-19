import math
from PIL import Image, ImageDraw, ImageFont

W, H = 900, 1580
MID = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 34)
BIG = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 88)
TINY = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
SM = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 30)
LINK = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 22)


def heart_points(cx, cy, r):
    pts = []
    for t in range(0, 360, 3):
        rad = math.radians(t)
        x = 16 * math.sin(rad) ** 3
        y = 13 * math.cos(rad) - 5 * math.cos(2 * rad) - 2 * math.cos(3 * rad) - math.cos(4 * rad)
        pts.append((cx + x * r / 16, cy - y * r / 16))
    return pts


gif = Image.open("teddy-sorry.gif")
gif.seek(2)
bear = gif.convert("RGBA").resize((470, 585), Image.LANCZOS)
qr = Image.open("qr.png").convert("RGB").resize((320, 320), Image.LANCZOS)

img = Image.new("RGB", (W, H), (255, 246, 251))
d = ImageDraw.Draw(img)
for y in range(H):
    k = y / H
    c = tuple(int(255 - (255 - v) * k) for v in (255, 215, 228))
    d.line([(0, y), (W, y)], fill=c)
d.rounded_rectangle([40, 40, W - 40, H - 40], radius=70, fill=(255, 255, 255), outline=(255, 255, 255), width=6)
d.rounded_rectangle([58, 58, W - 58, H - 58], radius=60, fill=(255, 235, 244), outline=(255, 215, 228), width=3)

d.rounded_rectangle([310, 215, 590, 252], radius=20, fill=(255, 255, 255), outline=(255, 215, 228), width=2)
d.text((450, 233), "A little message for you", font=MID, anchor="mm", fill=(208, 106, 154))

d.text((425, 322), "Sorry", font=BIG, anchor="mm", fill=(232, 87, 143))
d.polygon(heart_points(650, 322, 36), fill=(232, 87, 143))

d.text((450, 388), "I made this for you, from the bottom of my heart.", font=TINY, anchor="mm", fill=(138, 79, 117))
d.text((450, 420), "Please forgive me, best friend?", font=TINY, anchor="mm", fill=(138, 79, 117))

# teddy bear
img.paste(bear, ((W - bear.width) // 2, 455), bear)

# QR
qbx = (W - 346) // 2
qby = 1075
d.rounded_rectangle([qbx, qby, qbx + 346, qby + 346], radius=42, fill=(255, 250, 252), outline=(255, 215, 228), width=4)
img.paste(qr, (qbx + 13, qby + 13))

d.text((W // 2, 1455), "SCAN ME  &  READ YOUR APOLOGY", font=SM, anchor="mm", fill=(208, 106, 154))
d.text((W // 2, 1505), "atlanta-minimal-rear-carried.trycloudflare.com", font=LINK, anchor="mm", fill=(162, 104, 140))

img.save("sorry-card.png")
print("saved sorry-card.png", img.size)
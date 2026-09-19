import math
from PIL import Image, ImageDraw, ImageFont

S = 3
W, H = 480, 600
OO = (255, 246, 251)
FONT = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 30)


def heart_points(cx, cy, r):
    pts = []
    for t in range(0, 360, 3):
        rad = math.radians(t)
        x = 16 * math.sin(rad) ** 3
        y = 13 * math.cos(rad) - 5 * math.cos(2 * rad) - 2 * math.cos(3 * rad) - math.cos(4 * rad)
        pts.append((cx + x * r / 16, cy - y * r / 16))
    return pts


def draw_heart(draw, cx, cy, r, color):
    draw.polygon(heart_points(cx, cy, r), fill=color)


def draw_sparkle(draw, cx, cy, size, alpha):
    sp = draw.polygon
    pts = []
    for t in range(0, 360, 6):
        rad = math.radians(t)
        rr = size * (0.35 + 0.65 * abs(math.sin(4 * rad)))
        pts.append((cx + rr * math.cos(rad), cy + rr * math.sin(rad)))
    draw.polygon(pts, fill=(255, 214, 236, alpha))


def make_frame(idx, n=14):
    img = Image.new("RGBA", (W * S, H * S), OO)
    d = ImageDraw.Draw(img)
    # soft vertical gradient
    for yy in range(H * S):
        k = yy / (H * S)
        c = tuple(int(255 - (255 - v) * k) for v in (255, 233, 242))
        d.line([(0, yy), (W * S, yy)], fill=(c[0], c[1], c[2], 255))
    # floating hearts rising
    for j in range(5):
        ph = (idx - j * 3) % n / n
        fy = int(H * S * (0.62 - ph * 0.85))
        fx = (120 + j * 92) * S
        k = 1.0 if ph < 0.8 else max(0.0, (1 - ph) / 0.2)
        r = int((14 + 6 * math.sin(idx / 2 + j)) * S * (0.6 + 0.4 * ph))
        col = (255, 120, 170, int(190 * k))
        draw_heart(d, fx, fy, max(4, r), col)
    # bob
    bob = round(8 * S * math.sin(2 * math.pi * idx / 14))
    BH = 360 * S
    CX = 240 * S
    # ears
    for ex, ey in ((CX - 85 * S, BH - 150 * S), (CX + 85 * S, BH - 150 * S)):
        d.ellipse([ex - 40 * S, ey - 40 * S + bob, ex + 40 * S, ey + 40 * S + bob], fill=(196, 132, 79))
        d.ellipse([ex - 22 * S, ey - 22 * S + bob, ex + 22 * S, ey + 22 * S + bob], fill=(240, 178, 128))
    # head
    d.ellipse([CX - 120 * S, BH - 175 * S + bob, CX + 120 * S, BH + 45 * S + bob], fill=(217, 160, 102))
    # muzzle
    d.ellipse([CX - 52 * S, BH - 65 * S + bob, CX + 52 * S, BH + 18 * S + bob], fill=(245, 211, 168))
    # nose
    d.rounded_rectangle([CX - 16 * S, BH - 62 * S + bob, CX + 16 * S, BH - 34 * S + bob], radius=10 * S, fill=(92, 52, 32))
    # mouth
    d.arc([CX - 24 * S, BH - 30 * S + bob, CX + 24 * S, BH + 2 * S + bob], 20, 160, fill=(92, 52, 32), width=3 * S)
    # eyes
    for ex in (CX - 55 * S, CX + 55 * S):
        d.ellipse([ex - 10 * S, BH - 120 * S + bob, ex + 10 * S, BH - 96 * S + bob], fill=(60, 30, 20))
    # blush
    for ex in (CX - 88 * S, CX + 88 * S):
        d.ellipse([ex - 18 * S, BH - 78 * S + bob, ex + 18 * S, BH - 54 * S + bob], fill=(255, 170, 185, 140))
    # body
    d.ellipse([CX - 130 * S, BH + 6 * S + bob, CX + 130 * S, BH + 150 * S + bob], fill=(217, 160, 102))
    d.ellipse([CX - 82 * S, BH + 34 * S + bob, CX + 82 * S, BH + 120 * S + bob], fill=(245, 211, 168))
    # arms holding heart
    for dx in (-1, 1):
        d.ellipse([CX + dx * 120 * S - 34 * S, BH - 30 * S + bob, CX + dx * 120 * S + 34 * S, BH + 34 * S + bob],
                  fill=(196, 132, 79))
    # pulsing heart
    pulse = 1 + 0.14 * math.sin(2 * math.pi * idx / 7)
    hr = int(78 * S * pulse)
    draw_heart(d, CX, BH - 40 * S + bob + 8 * S, hr, (235, 64, 112))
    draw_heart(d, CX, BH - 40 * S + bob + 8 * S, int(hr * 0.52), (255, 255, 255, 30))
    # "sorry" on heart
    tf = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", int(30 * S * max(0.82, pulse)))
    txt = Image.new("RGBA", (200 * S, 60 * S), (0, 0, 0, 0))
    td = ImageDraw.Draw(txt)
    td.text((100 * S, 30 * S), "sorry", font=tf, anchor="mm", fill=(255, 255, 255, 255))
    txt = txt.rotate(-6 * math.sin(idx / 2), resample=3, expand=1)
    img.alpha_composite(txt, (CX - txt.width // 2, BH - 34 * S + bob))

    # sparkles
    for i in range(7):
        sx = (60 + i * 66) * S
        sy = (60 + ((i * 53) % 190)) * S
        tw = max(0.25, abs(math.sin(idx / 2 + i)))
        if tw > 0.3:
            draw_sparkle(d, sx, sy, int((8 + 4 * tw) * S), int(200 * tw))

    img = img.resize((W, H), Image.LANCZOS)
    return img.convert("RGBA")


frames = [make_frame(i) for i in range(14)]
white = Image.new("RGB", (W, H), (255, 255, 255))
imgs = []
for f in frames:
    w = Image.new("RGB", (W, H), (255, 255, 255))
    w.paste(f, (0, 0), f)
    imgs.append(w.convert("P", palette=Image.ADAPTIVE, colors=236))
imgs[0].save("/home/kali/sorry-website/cute-card/teddy-sorry.gif", save_all=True,
             append_images=imgs[1:], duration=90, loop=0, disposal=2)
print("gif frames:", len(imgs), "size:", imgs[0].size)
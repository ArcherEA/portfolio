---
title: 3D Wizard Chess
date: 2026-08-06
excerpt: A 3D chess game in Unity featuring a minimax AI opponent.
category: game
cover: /projects/3d-wizard-chess/cover.png
---

This is a project that took me several weeks to finish, built together with **Liang Gu**. I handled the programming while he took care of everything else — audio, images, and hunting down free 3D models online.

Most of my time went into really understanding the rules of chess and translating each piece into code, because every piece needed its own movement behavior. The fun part was the combat: instead of sliding flat counters around a board, the pieces actually attack each other and take over the square.

![The 3D chess board](/projects/3d-wizard-chess/screenshot-1.png)

## The AI opponent

The computer player runs on a **minimax algorithm** — an exhaustive search that plays out the possible moves and picks the line most likely to win. The catch is that it's expensive: exploring every branch burns through resources fast. So I capped the lookahead at **4 moves ahead**; go any deeper and the game grinds to a halt.

![A piece taking a square](/projects/3d-wizard-chess/screenshot-2.png)

It was a long time ago now, but I genuinely enjoyed that stretch of building it.

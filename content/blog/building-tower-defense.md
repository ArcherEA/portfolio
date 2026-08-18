---
title: Tower Defense
date: 2026-08-05
excerpt: A tower defense game built with Unity and C#.
category: game
cover: /projects/tower-defense/cover.png
---

This was our final project for a **Game Design course** at university, built with my roommate **Liang Gu**. We pulled together a lot of free assets — 3D models, visual effects, images, and background music — to bring it to life.

Our prototype and main inspiration was **Kingdom Rush**. We built four kinds of defense tower — **mage, soldier, cannon, and archer** — and gave the player active abilities on top: casting magic and spawning extra soldiers.

![Tower defense gameplay](/projects/tower-defense/screenshot-1.png)

## The shop (a.k.a. the cheat button)

Borrowing an idea from other games, we added a shop that hands the player a big power spike — basically a legal cheat. It costs crystals... except you can just spam the **+ button** to rack up as many crystals as you want. 😄

![The tower shop](/projects/tower-defense/screenshot-2.png)

Because we had more assets to work with this time, we packed in a range of **enemies, each with their own skills**.

![Enemies advancing](/projects/tower-defense/screenshot-3.png)

## The hard part: hitting a moving target

The trickiest piece was the projectiles. I didn't want attacks to miss, so I had to calculate a **curved path that leads a moving target** — aiming at where the enemy *will* be, not where it currently is. It took me a long time to get right... but I did it, and I'm honestly proud of that one.

![A projectile arcing toward an enemy](/projects/tower-defense/screenshot-4.png)

kaboom({
  global: true,
  scale: 2,
  fullscreen: true,
  clearColor: [0, 3, 0.5, 1], // rgba -> red green blue alpha
});
loadRoot("./sprites/");
loadSprite("spong", "spongebob.png");
loadSprite("block", "block.png");
loadSprite("surprise", "surprise.png");
loadSprite("unboxed", "unboxed.png");
loadSprite("pipe", "pipe_up.png");
loadSprite("mushroom", "mushroom.png");
loadSprite("mario", "mario.png");
loadSound("jump", "jumpSound.mp3");
loadSound("gameSound", "gameSound.mp3");
loadSprite("coin", "coin.png");
loadSprite("star", "star.png");
loadSprite("hearts", "heart.png");
loadSprite("mushromee", "mushromee.png")

let score = 0;
let hearts = 3;

scene("level.1", () => {
  play("gameSound");
  layers(["bg", "obj", "ui"], "obj");

  const map = [
    "        =!                                                                                                                                                 ",
    "        =!                                                                                                                                                 ",
    "        =!                                                                                                                                                 ",
    "        =!                                                                                                                                                 ",
    "  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                        ==========       ================ =============               ============= ===========            ",
    "                                          ==========c===          ========                                                                                 ",
    "                                                               ===                                                                                         ",
    "                                 ==============================                                                                                            ",
    "     ====!!=          ====!c===              ==                      ========     =             ==========                                                 ",
    "   =                                       ===                                     ===!= =cc=                             ===========                      ",
    "                                        ====                                                  ================= =========               =============    p  ",
    "             m      m         ======                                                                                                                         ",
    "==================================================================================  ===============================================  ====== ===============",
  ];

  const mapSymbols = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid(), "block"],
    s: [sprite("spong"), body(), "spong"],
    p: [sprite("pipe"), solid(), "pipe"],
    c: [sprite("surprise"), solid(), "surprise_star"],
    "!": [sprite("surprise"), solid(), "surprise_coin"],
    $: [sprite("coin"), body(), "coin"],
    u: [sprite("unboxed"), solid(), "unboxed"],
    "^": [sprite("star"), body(), solid(), "star"],
    "m": [sprite("mushromee"), body()],
  };

  const gameLevel = addLevel(map, mapSymbols);

  const player = add([
    sprite("mario"),
    solid(),
    pos(30, 0),
    body(),
    origin("bot"),
    // add this
    big(),
  ]);

  const scoreLabel = add([text("score: 0")]);
  const heartsObj = add([
    sprite("hearts"),
    text("     x3", 12),
    origin("center"),
  ]);

  const spong = add([
    sprite("spong"),
    solid(),
    pos(500, 300),
    body(),
    origin("bot"),
    "spong",
  ]);

  const spong2 = add([
    sprite("spong"),
    solid(),
    pos(200, 300),
    body(),
    origin("bot"),
    "spong",
  ]);

  const moveSpeed = 130;

  keyDown("d", () => {
    player.move(150, 0);
  });

  keyDown("a", () => {
    player.move(-150, 0);
  });

  keyDown("space", () => {
    if (player.grounded()) {
      play("jump");
      player.jump(350);
    }
  });

  player.on("headbump", (obj) => {
    if (obj.is("surprise_coin")) {
      destroy(obj);
      gameLevel.spawn("u", obj.gridPos);
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
    }
    if (obj.is("surprise_star")) {
      destroy(obj);
      gameLevel.spawn("u", obj.gridPos);
      gameLevel.spawn("^", obj.gridPos.sub(0, 1));
    }
  });

  action("star", (obj) => {
    obj.move(20, 0);
  });

  player.collides("coin", (obj) => {
    destroy(obj);
    if (player.isBig()) {
      score += 6;
    } else {
      score += 2;
    }
  });

  player.collides("star", (obj) => {
    destroy(obj);
    player.biggify(6);
  });

  player.collides("pipe", (obj) => {
    keyDown("s", () => {
      go("win");
    });
  });

  player.action(() => {
    camPos(player.pos);
    scoreLabel.pos = player.pos.sub(400, 200);
    heartsObj.pos = player.pos.sub(400, 170);
    scoreLabel.text = "score: " + score;
    heartsObj.text = "   x" + hearts;
    if (player.pos.y > 1000) {
      go("lose");
    }
    if (hearts <= 0) {
      go("lose");
    }
  });

  spong.action(() => {
    spong.move(-30, 0);
  });
  spong2.action(() => {
    spong2.move(-30, 0);
  });

  let lastgrounded = true;
  player.collides("spong", (obj) => {
    if (lastGrounded) {
      hearts--;
    } else {
      destroy(obj);
    }
  });

  player.action(() => {
    lastGrounded = player.grounded();
  });
  // scene end
});

scene("level.2", () => {
  play("gameSound");
  layers(["bg", "obj", "ui"], "obj");

  const map = [
    "        =!                                                                                                                                                 ",
    "        =!                                                                                                                                                 ",
    "        =!                                                                                                                                                 ",
    "        =!                                                                                                                                                 ",
    "  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                                                                           ",
    "                                                                                                              ",
    "                                                                                                              ",
    "                                                                                                              ",
    "                                                                                                              ",
    "                 ==c!====  ====                                                                               ",
    "               =                                                                                              ",
    "                    ==                                                                                     p  ",
    "              m                          m                 m                                                     ",
    "======================================================================================  ====== ===============",
  ];

  const mapSymbols = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid(), "block"],
    s: [sprite("spong"), body(), "spong"],
    p: [sprite("pipe"), solid(), "pipe"],
    c: [sprite("surprise"), solid(), "surprise_star"],
    "!": [sprite("surprise"), solid(), "surprise_coin"],
    $: [sprite("coin"), body(), "coin"],
    u: [sprite("unboxed"), solid(), "unboxed"],
    "^": [sprite("star"), body(), solid(), "star"],
  };

  const gameLevel = addLevel(map, mapSymbols);

  const player = add([
    sprite("mario"),
    solid(),
    pos(30, 0),
    body(),
    origin("bot"),
    // add this
    big(),
  ]);

  const scoreLabel = add([text("score: 0")]);

  const spong = add([
    sprite("spong"),
    solid(),
    pos(500, 300),
    body(),
    origin("bot"),
    "spong",
  ]);

  const spong2 = add([
    sprite("spong"),
    solid(),
    pos(200, 300),
    body(),
    origin("bot"),
    "spong",
  ]);

  const moveSpeed = 130;

  keyDown("d", () => {
    player.move(150, 0);
  });

  keyDown("a", () => {
    player.move(-150, 0);
  });

  keyDown("space", () => {
    if (player.grounded()) {
      play("jump");
      player.jump(350);
    }
  });

  player.on("headbump", (obj) => {
    if (obj.is("surprise_coin")) {
      destroy(obj);
      gameLevel.spawn("u", obj.gridPos);
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
    }
    if (obj.is("surprise_star")) {
      destroy(obj);
      gameLevel.spawn("u", obj.gridPos);
      gameLevel.spawn("^", obj.gridPos.sub(0, 1));
    }
  });

  action("star", (obj) => {
    obj.move(20, 0);
  });

  player.collides("coin", (obj) => {
    destroy(obj);
    if (player.isBig()) {
      score += 6;
    } else {
      score += 2;
    }
  });

  player.collides("star", (obj) => {
    destroy(obj);
    player.biggify(6);
  });

  player.collides("pipe", (obj) => {
    keyDown("s", () => {
      go("win");
    });
  });

  player.action(() => {
    camPos(player.pos);
    scoreLabel.pos = player.pos.sub(400, 200);
    scoreLabel.text = "score: " + score;
    if (player.pos.y > 1000) {
      hearts--;
    }
    if (hearts <= 0) {
      go("lose");
    }
  });

  spong.action(() => {
    spong.move(-30, 0);
  });
  spong2.action(() => {
    spong2.move(-30, 0);
  });

  let lastgrounded = true;
  player.collides("spong", (obj) => {
    if (lastGrounded) {
      destroy(player);
      go("lose");
    } else {
      destroy(obj);
    }
  });

  player.action(() => {
    lastGrounded = player.grounded();
  });
  // scene end
});

scene("lose", () => {
  score = 0; 
  hearts = 3;
  add([rect(width(), height()), color(0, 0, 0)]);
  add([
    text("Game Over\nYou Lost", 64),
    origin("center"),
    pos(width() / 2, height() / 2),
  ]);
  add([
    text("press (space) to restart", 10),
    origin("center"),
    pos(width() / 2, 320),
  ]);
  keyDown("space", () => {
    go("level.1");
  });
});

scene("win", () => {
  add([rect(width(), height()), color(0, 0, 0)]);
  add([text("Winner!", 64), origin("center"), pos(width() / 2, height() / 2)]);
  keyDown("space", () => {
    go("level.2");
  });
  add([
    text("press (space) to restart", 10),
    origin("center"),
    pos(width() / 2, 320),
  ]);
});

start("level.1");

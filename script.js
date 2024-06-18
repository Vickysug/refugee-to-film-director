class Example extends Phaser.Scene {
    constructor() {
        super('Example');
    }
  //start screen images
    preload() {
        this.load.image('sky', 'https://play.rosebud.ai/assets/hollywood.2.png?n5bZ');
        this.load.image('logo', 'https://play.rosebud.ai/assets/start.screen.image.png?2iKX');
        this.load.image('red', 'https://play.rosebud.ai/assets/clear.png?um2N');
    }
  
    create() {
        document.title = "Refugee To Film Director";
  
        this.add.image(400, 300, 'sky');
  //particles - not used - changed image to clear
        const particles = this.add.particles('red');
        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
        });
        //bouncing image
        const logo = this.physics.add.image(400, 100, 'logo');
  
        logo.setVelocity(100, 200);
        logo.setBounce(0.3, 0.3);
        logo.setCollideWorldBounds(true);
  
        emitter.startFollow(logo);
        //Names of film directors
        this.add.text(15, 25, 'Refugee To Film Director', { font: 'bold 68px Ariel', fill: '#cf1322' });
        this.add.text(10, 150, 'Billy Wilder', { font: 'bold 20px Courier New', fill: '#000000' });
        this.add.text(170, 150, ' Robert Vas', { font: 'bold 20px Courier New', fill: '#000000' });
        this.add.text(85, 175, 'Fritz Lang', { font: 'bold 20px Courier New', fill: '#000000' });
        this.add.text(420, 220, '', { font: 'bold 20px Courier New', fill: '#000000' });
  
        //Proceed button
        const proceedButton = this.add.text(500, 500, 'Proceed', { font: 'bold 40px Arial', fill: '#f5d50a' });
        proceedButton.setInteractive();
  
        proceedButton.on('pointerdown', () => {
            console.log('Proceed button clicked');
            this.scene.start('AnotherScene');
        });
    }
  }
  
  //Scene 2 - information and game instrutions
  class AnotherScene extends Phaser.Scene {
    constructor() {
        super('AnotherScene');
    }
  
    create() {
        const textLabel = this.add.text(20, 20, 'Billy Wilder. June 22, 1906 to March 27, 2002). Austrian-born. Moved to Hollywood in 1934.\n\n Received his first nomination for the Academy Award for Best Director with the film noir Double Indemnity (1944).\nRobert Vas 3 March 1931 to 10 April 1978. Born in Hungary. \n\n Came to England after the Hungarian uprising in 1956 \n\nMade a series of films for the BBC.\n\n Fritz Lang, December 5, 1890 to August 2, 1976). Austrian-born.  \n\n Moved to Hollywood in 1936.\n ', { font: 'bold 20px Courier New', fill: '#ffffff', wordWrap: { width: 760, useAdvancedWrap: true } });
  
        console.log(textLabel);
  
        const startButton = this.add.text(620, 540, 'Start Game', { font: 'bold 40px Arial', fill: '#ffffff' });
        startButton.setInteractive();
  
        startButton.on('pointerdown', () => {
            console.log('Proceed button clicked');
            this.scene.start('Filmmemory');
        });
    }
  }
  
  class Filmmemory extends Phaser.Scene {
    constructor() {
        super('Filmmemory');
        this.cardSize = 80;
        this.spacing = 20;
        this.clickedCards = [];
        this.matchedPairs = 0;
        this.totalMatchedPairs = 0;
        this.scaleX = null;
        this.scaleY = null;
        this.gameOver = false;
        this.ignoreClicks = false;
    }
  
    preload() {
        this.load.image('background', 'https://play.rosebud.ai/assets/create%20a%20movie%20set%20background.png?7AhS');
        this.load.image('card back', 'https://play.rosebud.ai/assets/Retro TV.png?rIrX');
        this.load.image('clapper', 'https://play.rosebud.ai/assets/create%20a%20clapperboard.png?x1fp');
        this.load.image('camera', 'https://play.rosebud.ai/assets/create%20a%20filmset%20camera.png?rvdL');
        this.load.image('megaphone', 'https://play.rosebud.ai/assets/megaphone.jpg?PgLS');
        this.load.image('camera2', 'https://play.rosebud.ai/assets/camera.jpg?ZQmm');
        this.load.image('reel', 'https://play.rosebud.ai/assets/create a camera film reel.png?aZ6y');
        this.load.image('chair', 'https://play.rosebud.ai/assets/directors-chair.jpg?Z006');
        this.load.image('microphone', 'https://play.rosebud.ai/assets/retro microphone.png?NTHG');
        this.load.image('camera3', 'https://play.rosebud.ai/assets/camera2.jpg?HBZL');
      }
    
      create() {
          this.startGame(this);
          this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (event) => {
              if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER && this.gameOver) {
                  this.children.removeAll();
                  this.totalMatchedPairs = 0;
                  this.startGame(this);
              }
          });
      }
    
      startGame(context) {
          this.gameOver = false;
          this.ignoreClicks = false;
    
          let background = context.add.image(0, 0, 'background');
          background.setOrigin(0, 0);
          background.setAlpha(0.85);
          background.setTint(0x808080);
          this.scaleX = this.cameras.main.width / background.width;
          this.scaleY = this.cameras.main.height / background.height;
          background.setScale(this.scaleX, this.scaleY);
    
          var images = ['clapper', 'camera', 'megaphone', 'camera2', 'reel', 'chair', 'microphone', 'camera3'];
        images = images.concat(images);
        Phaser.Utils.Array.Shuffle(images);
  
        const totalWidth = 4 * context.cardSize + 3 * context.spacing;
        const totalHeight = 4 * context.cardSize + 3 * context.spacing;
  
        const startX = (context.sys.canvas.width - totalWidth) / 2;
        const startY = context.sys.canvas.height - totalHeight;
  
        context.clickedCards = [];
        context.cardBackSprites = [];
        context.matchedPairs = 0;
  
        var countdownUncovered = 15;
        var countdownCovered = 45;
  
        var countdownText = context.add.text(context.sys.canvas.width / 2, 10, 'Countdown: ' + countdownUncovered, { fontSize: '35px', fill: '#FFA500' });
        countdownText.setOrigin(0.5, 0);
  
        var totalPairsMatchedText = context.add.text(context.sys.canvas.width / 2, countdownText.y + countdownText.height + 10, 'Total Pairs Matched: ', { fontSize: '20px', fill: '#8888FF', fontWeight: 'bold' });
        totalPairsMatchedText.setOrigin(0.5, 0);
        var totalMatchedPairsText = context.add.text(totalPairsMatchedText.x + totalPairsMatchedText.width / 2, totalPairsMatchedText.y, context.totalMatchedPairs, { fontSize: '20px', fill: '#8888FF', fontWeight: 'bold' });
        totalMatchedPairsText.setOrigin(0, 0);
  
        var memorizeText = context.add.text(context.sys.canvas.width / 2, startY / 2, 'MEMORIZE MATCHING PAIRS', { fontSize: '40px', fill: '#ADD8E6', align: 'center' });
        memorizeText.setOrigin(0.5, 0.5);
  
        var clickPairsText = context.add.text(context.sys.canvas.width / 2, startY / 2, 'CLICK THE PAIRS', { fontSize: '40px', fill: '#ADD8E6', align: 'center' });
        clickPairsText.setOrigin(0.5, 0.5);
        clickPairsText.visible = false;
  
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let imageKey = images[i * 4 + j];
                let image = context.add.image(startX + (context.cardSize + context.spacing) * j, startY + (context.cardSize + context.spacing) * i, imageKey);
  
                let scale = context.cardSize / Math.max(image.width, image.height);
                image.setScale(scale);
  
                let cardBack = context.add.image(image.x, image.y, 'card back');
                cardBack.setData('key', imageKey);
                cardBack.visible = false;
  
                scale = context.cardSize / Math.max(cardBack.width, cardBack.height);
                cardBack.setScale(scale);
  
                context.cardBackSprites.push(cardBack);
  
                image.setData('key', imageKey);
                image.visible = true;
  
                context.time.delayedCall(countdownUncovered * 1000, () => {
                    image.visible = false;
                    cardBack.visible = true;
                    memorizeText.visible = false;
                    clickPairsText.visible = true;
  
                    var timedEvent = context.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            countdownCovered--;
                            countdownText.setText('Countdown: ' + countdownCovered);
                            if (countdownCovered <= 0) {
                                context.endGame(context, totalPairsMatchedText, totalMatchedPairsText);
                            }
                        },
                        callbackScope: context,
                        loop: true
                    });
                });
            }
        }
  
        context.input.on('gameobjectdown', function (pointer, cardBack) {
            if (context.ignoreClicks || context.gameOver) {
                return;
            }
            context.handleCardClick(context, cardBack, countdownText, totalPairsMatchedText, totalMatchedPairsText);
        });
  
        context.input.on('pointerdown', () => {
            console.log('Pointer down event registered');
        });
    }
  
    handleCardClick(context, cardBack, countdownText, totalPairsMatchedText, totalMatchedPairsText) {
        if (!context.ignoreClicks && context.clickedCards.length < 2) {
            cardBack.visible = false;
            context.clickedCards.push(cardBack);
  
            if (context.clickedCards.length === 2) {
                context.ignoreClicks = true;
  
                if (context.clickedCards[0].getData('key') === context.clickedCards[1].getData('key')) {
                    context.matchedPairs++;
                    context.totalMatchedPairs++;
                    context.clickedCards = [];
                    context.ignoreClicks = false;
  
                    if (context.matchedPairs === 8) {
                        context.endGame(context, totalPairsMatchedText, totalMatchedPairsText);
                    }
                } else {
                    context.time.delayedCall(1000, () => {
                        context.clickedCards[0].visible = true;
                        context.clickedCards[1].visible = true;
                        context.clickedCards = [];
                        context.ignoreClicks = false;
                    });
                }
  
                totalPairsMatchedText.setText('Total Pairs Matched: ' + context.totalMatchedPairs);
            }
        }
    }
  
    endGame(context, totalPairsMatchedText, totalMatchedPairsText) {
        context.gameOver = true;
        context.ignoreClicks = true;
  
        context.add.text(context.sys.canvas.width / 2, context.sys.canvas.height / 2, 'Game Over', { fontSize: '40px', fill: '#ff0000' }).setOrigin(0.5, 0.5);
        context.add.text(context.sys.canvas.width / 2, context.sys.canvas.height / 2 + 50, 'Press Enter to Restart', { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5, 0.5);
  
        totalPairsMatchedText.setText('Total Pairs Matched: ' + context.totalMatchedPairs);
    }
  }
  
  const config = {
      type: Phaser.AUTO,
      parent: 'renderDiv',
      ////////////
      scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
      },  
      /////////////
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Example, AnotherScene, Filmmemory]
  };
  
  const game = new Phaser.Game(config);
class Example extends Phaser.Scene {
    constructor() {
        super('Example');
    }
    preload() {
        this.load.image('sky', 'https://play.rosebud.ai/assets/hollywood.2.png?n5bZ');
        this.load.image('logo', 'https://play.rosebud.ai/assets/start.screen.image.png?2iKX');
        this.load.image('red', 'https://play.rosebud.ai/assets/clear.png?um2N');
    }

    create() {
        document.title = "Refugee To Film Director";

        this.add.image(400, 300, 'sky');
        const particles = this.add.particles('red');
        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
        });
        const logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(0.3, 0.3);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);
        this.add.text(15, 25, 'Refugee To Film Director', { font: 'bold 68px Ariel', fill: '#cf1322' });
        this.add.text(10, 150, 'Billy Wilder', { font: 'bold 20px Courier New', fill: '#000000' });
        this.add.text(170, 150, ' Robert Vas', { font: 'bold 20px Courier New', fill: '#000000' });
        this.add.text(85, 175, 'Fritz Lang', { font: 'bold 20px Courier New', fill: '#000000' });
        this.add.text(420, 220, '', { font: 'bold 20px Courier New', fill: '#000000' });

        const proceedButton = this.add.text(500, 500, 'Proceed', { font: 'bold 40px Arial', fill: '#f5d50a' });
        proceedButton.setInteractive();

        proceedButton.on('pointerdown', () => {
            console.log('Proceed button clicked');
            this.scene.start('AnotherScene');
        });
    }
}

class AnotherScene extends Phaser.Scene {
    constructor() {
        super('AnotherScene');
    }

    preload() {
        this.load.image('billyWilder', 'https://play.rosebud.ai/assets/wilder.name.jpg?Mrvf');
        this.load.image('robertVas', 'https://play.rosebud.ai/assets/vas.name.jpg?mJGP');
        this.load.image('fritzLang', 'https://play.rosebud.ai/assets/Lang.name.png?6uFK');
    }

    create() {
        const textLabel = this.add.text(20, 180, 'Billy Wilder, June 22 1906 to March 27 2002. Austrian-born. Moved to Hollywood in 1934.\n\n Received his first nomination for the Academy Award for Best Director with the film noir Double Indemnity (1944).\n\n\n Robert Vas, 3 March 1931 to 10 April 1978. Born in Hungary. \n Moved to England after the Hungarian uprising in 1956. \nMade his first film "Refuge England" in 1959. Also made a series of films for the BBC.\n\n\n Fritz Lang, December 5, 1890 to August 2 1976. Austrian-born.  \n Moved to Beverly Hills in 1936. His film "Metropolis" 1972 regarded as a masterpiece. ', { font: 'bold 20px Courier New', fill: '#ffffff', wordWrap: { width: 760, useAdvancedWrap: true } });

        const textGame = this.add.text(20, 450, ' Play the game: Memorise pairs of film making items from history. When the cards are turned over, click the pairs and beat the timer!', { font: 'bold 20px Times New Roman', fill: '#34eb92', wordWrap: { width: 760, useAdvancedWrap: true } });

        this.add.image(200, 70, 'billyWilder').setScale(0.2);
        this.add.image(400, 70, 'robertVas').setScale(0.8);
        this.add.image(600, 70, 'fritzLang').setScale(0.3);

        console.log(textLabel);

        const startButton = this.add.text(500, 540, 'Start Game', { font: 'bold 40px Arial', fill: '#ffffff' });
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
        this.load.image('megaphone', 'https://play.rosebud.ai/assets/megaphone.jpg?HRyL');
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

        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 4; j++) {
                let imageKey = images[i * 4 + j];
                let image = context.add.image(startX + (context.cardSize + context.spacing) * j, startY + (context.cardSize + context.spacing) * i, imageKey);

                let scale = context.cardSize / Math.max(image.width, image.height);
                image.setScale(scale);

                let cardBack = context.add.image(image.x, image.y, 'card back');
                cardBack.setData('key', imageKey);
                cardBack.visible = false;

                scale = context.cardSize / Math.max(cardBack.width, cardBack.height);
                cardBack.setScale(scale);

                cardBack.setInteractive();

                cardBack.on('pointerdown', () => {
                    if(context.clickedCards.length < 2 && !this.ignoreClicks) { // Ignore clicks if ignoreClicks is true
                        cardBack.visible = false;
                        context.clickedCards.push(cardBack);

                        if(context.clickedCards.length === 2) {
                            context.cardBackSprites.forEach(sprite => sprite.disableInteractive());

                            if(context.clickedCards[0].getData('key') === context.clickedCards[1].getData('key')) {
                                context.clickedCards = [];
                                context.matchedPairs++;
                                context.totalMatchedPairs++; 
                                totalMatchedPairsText.setText(context.totalMatchedPairs); 

                                context.cardBackSprites.forEach(sprite => sprite.setInteractive());

                                if (context.matchedPairs === 8) {
                                    context.coveredTimer.remove();

                                    let rectangle = context.add.rectangle(context.sys.canvas.width / 2, context.sys.canvas.height / 2, context.sys.canvas.width, context.sys.canvas.height, 0x000000);
                                    rectangle.setAlpha(0.5);

                                    let text = context.add.text(context.sys.canvas.width / 2, context.sys.canvas.height / 2, 'Good job!\nHere comes the next round.', { fontSize: '50px', fill: '#FFFF00', align: 'center', fontWeight: 'bold' });
                                    text.setOrigin(0.5, 0.5);

                                    context.time.delayedCall(5000, () => {
                                        context.children.removeAll();
                                        context.startGame(context);
                                    });
                                }
                            } else {
                                context.time.delayedCall(1500, () => {
                                    context.clickedCards[0].visible = true;
                                    context.clickedCards[1].visible = true;
                                    context.clickedCards = [];
                                    context.cardBackSprites.forEach(sprite => sprite.setInteractive());
                                });
                            }
                        }
                    }
                });

                context.cardBackSprites.push(cardBack);
            }
        }

        var uncoveredTimer = context.time.addEvent({
            delay: 1000,
            callback: () => {
                countdownUncovered--;
                countdownText.setText('Countdown: ' + countdownUncovered);

                if(countdownUncovered <= 0) {
                    memorizeText.visible = false;
                    clickPairsText.visible = true;
                    context.cardBackSprites.forEach(sprite => sprite.visible = true);

                    uncoveredTimer.remove();
                    countdownText.setText('Countdown: ' + countdownCovered);

                    context.coveredTimer = context.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            countdownCovered--;
                            countdownText.setText('Countdown: ' + countdownCovered);

                            if(countdownCovered <= 0) {
                                context.coveredTimer.remove();
                                context.children.removeAll(true);
                                context.add.image(0, 0, 'background').setOrigin(0,0).setAlpha(0.85).setTint(0x808080).setScale(context.scaleX, context.scaleY);
                                var finalScoreText = context.add.text(context.sys.canvas.width / 2, context.sys.canvas.height / 2, 'Final Score: ' + context.totalMatchedPairs + '\nPress ENTER to restart.', { fontSize: '50px', fill: '#ADD8E6', align: 'center', fontWeight: 'bold' });
                                finalScoreText.setOrigin(0.5, 0.5);
                                this.gameOver = true;
                                this.ignoreClicks = true; // Set ignoreClicks to true when countdown reaches 0
                            }
                        },
                        loop: true
                    });
                }
            },
            loop: true
        });
    }
}


const config = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
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
new Vue({
    el: '#app',
    data: {
        player: {
            Health : 100,
            Color : 'green'
        },
        monster: {
            Health : 100,
            Color : 'green'
        },
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () 
        {
            this.gameIsRunning = true;
            this.turns = [];
            this.setPlayerHealth(100);
            this.setMonsterHealth(100);
            this.playerColorChange();
            this.monsterColorChange();
        },
        attack: function () 
        {
            var damage = this.calculateDamage(3, 10);
            this.setMonsterHealth(this.getMonsterHealth() - damage);
            this.monsterColorChange();
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        specialAttack: function () 
        {
            var damage = this.calculateDamage(10, 20);
            this.setMonsterHealth(this.getMonsterHealth() - damage);
            this.monsterColorChange();
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal: function () 
        {
            if (this.getPlayerHealth() <= 90) {
                this.setPlayerHealth(this.getPlayerHealth() + 10);
            } else {
                this.setPlayerHealth(100);
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.monsterAttacks();
        },
        giveUp: function () 
        {
            this.gameIsRunning = false;
        },
        monsterAttacks: function()
         {
            var damage = this.calculateDamage(5, 12);
            this.setPlayerHealth(this.getPlayerHealth() - damage)
            this.playerColorChange();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
        },
        calculateDamage: function(min, max) 
        {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() 
        {
            if (this.getMonsterHealth() <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.getPlayerHealth() <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        playerColorChange : function ()
        {
            if (this.getPlayerHealth() < 70){
                this.player.Color = '#FFC107';
            }
            if (this.getPlayerHealth() < 30) {
                this.player.Color = '#F00';
            }
            if(this.getPlayerHealth() > 70) {
                this.player.Color = 'green';
            }
        },
        monsterColorChange: function ()
        {
            if (this.getMonsterHealth() < 70){
                this.monster.Color = '#FFC107';
            }
            if (this.getMonsterHealth() < 30) {
                this.monster.Color = '#F00';
            }
            if(this.getMonsterHealth() > 70) {
                this.monster.Color = 'green';
            }
        },
        //geter and seter
        getPlayerHealth : function () {
            return this.player.Health;
        },
        setPlayerHealth : function (h) {
            this.player.Health = h;
        },
        getMonsterHealth : function () {
            return this.monster.Health;
        },
        setMonsterHealth : function (h) {
            this.monster.Health = h;
        }
    }
    
});
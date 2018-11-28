/*
*
* working in branch div
*
*/
new Vue({
    el: '#app',
    data: {
        Player: {
            health : 100,
            color : 'green'
        },
        Monster: {
            health : 100,
            color : 'green'
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
            if (this.getMonsterHealth() <= 0)
            {
                if (confirm('You won! New Game?'))
                {
                    this.startGame();
                } 
                else
                {
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if (this.getPlayerHealth() <= 0)
            {
                if (confirm('You lost! New Game?'))
                {
                    this.startGame();
                } 
                else
                {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        playerColorChange : function ()
        {
            if (this.getPlayerHealth() < 70){
                this.Player.color = '#FFC107';
            }
            if (this.getPlayerHealth() < 30) {
                this.Player.color = '#F00';
            }
            if(this.getPlayerHealth() > 70) {
                this.Player.color = 'green';
            }
        },
        monsterColorChange: function ()
        {
            if (this.getMonsterHealth() < 70){
                this.Monster.color = '#FFC107';
            }
            if (this.getMonsterHealth() < 30) {
                this.Monster.color = '#F00';
            }
            if(this.getMonsterHealth() > 70) {
                this.Monster.color = 'green';
            }
        },
        //geters and seters
        getPlayerHealth : function () {
            return this.Player.health;
        },
        setPlayerHealth : function (h) {
            this.Player.health = h;
        },
        getMonsterHealth : function () {
            return this.Monster.health;
        },
        setMonsterHealth : function (h) {
            this.Monster.health = h;
        }
    }
    
});
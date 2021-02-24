    class Game{
        constructor(){

        }
        getState() {
            var gameStateRef = database.ref('gameState');
            gameStateRef.on("value", function (data) {
                gameState = data.val();
            })

        }

        update(state){
            database.ref('/').update({
                gameState: state
            });
        }

        async start() {

                if (gameState === 0) {
                    player = new Player();
                    var playerCountRef = await database.ref('playerCount').once("value");
                    if (playerCountRef.exists()) {
                        playerCount = playerCountRef.val();
                        player.getCount();
                    }
                    form = new Form()
                    form.display();
                }
                        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
        player1.scale = 0.4;

        player2 = createSprite(400,500);
        player2.addImage("player2", player2_img);
        player2.scale = 0.4;

        player3 = createSprite(600,500);
        player3.addImage("player3", player3_img);
        player3.scale = 0.4;

        player4 = createSprite(800,500);
        player4.addImage("player4", player4_img);
        player4.scale = 0.4;

        players=[player1,player2,player3,player4];

            }
        
        play(){
            
            form.hide();        

            Player.getPlayerInfo();     
            if(allPlayers !== undefined){
                background(bg2);
                var index = 0;

                //x and y position of the cars
                var x = 20;
                var y ;
        
                for(var plr in allPlayers){
                //add 1 to the index for every loop
                index = index + 1 ;
               // allPlayers[plr].horizontal += 0;
                //allPlayers[plr].distance += 500;
                //position the players a little away from each other in x direction
                x = 20+(index*250)+allPlayers[plr].horizontal;
                //use data form the database to display the players in y direction
                y = displayHeight - allPlayers[plr].distance;
                players[index-1].x = x;
                players[index-1].y = y;                
                
               
                if(index === player.index){
                    fill("black");
                    textSize(25);
                    text(player.name ,x-25,y+25)
                }

                fill("white");
                textSize(25);
                text("Score =",20,50);
                text(allPlayers["player1"].name +"= "+ allPlayers["player1"].score,20 ,90)
                text(allPlayers["player2"].name +"= "+ allPlayers["player2"].score,20 ,125)

            
                }
        }
            // Give movements for the players using arrow keys
                if(keyIsDown(UP_ARROW) && player.index !== null){
                player.distance +=10
                player.update();
            }

            if(keyIsDown(DOWN_ARROW) && player.index !== null){
                player.distance -=10
                player.update();
            }
            if(keyIsDown(LEFT_ARROW) && player.index !== null){
                player.horizontal -=10
                player.update();
            }

            if(keyIsDown(RIGHT_ARROW) && player.index !== null){
                player.horizontal +=10
                player.update();
            }
            drawSprites();
            }

            
            
        end(){
            
            background("red");
            textSize(35);
            fill("orange");
            text("Game Over!",480,300);
        console.log("Game Ended");
        }
    }
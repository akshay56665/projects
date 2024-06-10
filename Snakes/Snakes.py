import pygame
from random import randint
pygame.init()
pygame.mixer.init()

#colours definition
white=(255,255,255)
black=(0,0,0)
red=(255,0,0)
lightblue=(173,216,230)
#screen resolution
screen_width=850
screen_height=450
# image
backimage=pygame.image.load("background.jpg")
backimage=pygame.transform.scale(backimage,(screen_width,screen_height))
frontimage=pygame.image.load("front.jpg")
frontimage=pygame.transform.scale(frontimage,(screen_width,screen_height))

gamewindow=pygame.display.set_mode((screen_width,screen_height))
pygame.display.set_caption("Snakes")
clock=pygame.time.Clock()
font=pygame.font.SysFont(None,55)

def text_screen(text,color,x,y):
    screen_text=font.render(text,True,color)
    gamewindow.blit(screen_text,[x,y])

def plot_snake(gamewindow,color,snk_list,snake_size):
    for x,y in snk_list:
        pygame.draw.rect(gamewindow, black, [x, y, snake_size, snake_size])  # snake formation

def welcome():
    exit_game=False
    pygame.mixer.music.load("naagin.mp3")
    pygame.mixer.music.play()
    while not exit_game:
        gamewindow.fill(lightblue)
        gamewindow.blit(frontimage,(0,0))
        text_screen("Welcome to snakes",black,250,150)
        text_screen("Press space to start or escape to quit",black,85,200)
        for event in pygame.event.get():
            if event.type==pygame.QUIT:
                exit_game=True
            elif event.type==pygame.KEYDOWN:
                if event.key==pygame.K_SPACE:
                    pygame.mixer.music.stop()
                    gameloop()
                elif event.key==pygame.K_ESCAPE:
                    exit_game=True
        pygame.display.update()
        clock.tick(60)

def gameloop():
    # game loop variables
    game_over = False
    quit_game = False
    # snake related variables
    snake_x = 55
    snake_y = 60
    snake_size = 10
    # fps
    fps = 30
    # velocity variables
    velocity_x = 5
    velocity_y = 0
    # food variables
    food_x = randint(30, screen_width - 30)
    food_y = randint(30, screen_height - 30)
    food_size = 10
    # score
    score = 0
    #with open("hiscore.txt","r") as f:
    #    hiscore=f.read()

    snk_list = []
    snk_length = 1
    temp=snk_length

    while not quit_game:
        if game_over:
            #with open("hiscore.txt", "w") as f:
            #    f.write(str(hiscore))
            gamewindow.fill(lightblue)
            text_screen("Game over. Press Enter to continue", red, 100, 200)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    quit_game = True
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_RETURN:
                        pygame.mixer.music.stop()
                        gameloop()

        else:

            for event in pygame.event.get():
                if event.type==pygame.QUIT:
                    quit_game=True
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_RIGHT:
                        velocity_x = 5
                        velocity_y = 0
                    if event.key == pygame.K_LEFT:
                        velocity_x = -5
                        velocity_y = 0
                    if event.key == pygame.K_UP:
                        velocity_y = -5
                        velocity_x = 0
                    if event.key == pygame.K_DOWN:
                        velocity_y = 5
                        velocity_x = 0
                    if event.key == pygame.K_q:
                        score+=2
            # snake velocity
            snake_x = snake_x + velocity_x
            snake_y = snake_y + velocity_y

            if abs(snake_x - food_x) < 8 and abs(snake_y - food_y) < 8:
                score += 1
                pygame.mixer.music.load("eating.mp3")
                pygame.mixer.music.play()
                food_x = randint(30, screen_width - 30)
                food_y = randint(30, screen_height - 30)
                snk_length += 3

            gamewindow.fill(white)
            #if score>int(hiscore):
            #    hiscore=score
            gamewindow.blit(backimage,(0,0))
            text_screen("Score: " + str(score), red, 3, 3)
            pygame.draw.rect(gamewindow, red, [food_x, food_y, food_size, food_size])  # food formation

            head = []
            head.append(snake_x)
            head.append(snake_y)
            snk_list.append(head)
            if len(snk_list) > snk_length:
                del snk_list[0]
            plot_snake(gamewindow, black, snk_list, snake_size)

            if snake_x < 0 or snake_x > screen_width or snake_y < 0 or snake_y > screen_height:
                game_over = True
                pygame.mixer.music.load("crash.wav")
                pygame.mixer.music.play()
            if head in snk_list[:-1]:
                game_over=True
                pygame.mixer.music.load("crash.wav")
                pygame.mixer.music.play()
            if snk_length>temp:
                fps+=5
                temp=snk_length
        pygame.display.update()
        clock.tick(fps)
    pygame.quit()
    quit()
welcome()
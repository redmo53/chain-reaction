def on_received_number(receivedNumber):
    pass
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    global number
    if setup and number > 0:
        number += -1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global setup, received
    setup = not (setup)
    received = False
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global number
    if setup and number < 30:
        number += 1
input.on_button_pressed(Button.B, on_button_pressed_b)

received = False
setup = False
number = 0
radio.set_group(23)
number = 0
setup = True
blink = False
received = False

def on_forever():
    global blink
    if setup:
        basic.show_string("" + str((number)))
    elif received:
        basic.show_icon(IconNames.HAPPY)
    else:
        blink = not (blink)
        if blink:
            basic.show_leds("""
                . . . . .
                . . . . .
                . . . . .
                # . # . #
                . . . . .
                """)
            basic.pause(200)
        else:
            basic.clear_screen()
            basic.pause(200)
basic.forever(on_forever)

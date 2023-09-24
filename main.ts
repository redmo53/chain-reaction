input.onButtonPressed(Button.A, function () {
    if (setup && number > 0) {
        number += -1
    }
})
input.onButtonPressed(Button.AB, function () {
    setup = !(setup)
    sending = number == 0
    received = false
    end = false
})
input.onButtonPressed(Button.B, function () {
    if (setup && number <= 30) {
        number += 1
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "message" && value == number) {
        radio.sendValue("received", value - 1)
        sending = true
    } else if (name == "received" && value == number) {
        sending = false
        received = true
    } else if (name == "end") {
        last = value
        received = false
        end = true
        counter = 0
    }
})
let blink = false
let last = 0
let sending = false
let counter = 0
let end = false
let received = false
let setup = false
let number = 0
radio.setGroup(23)
number = 0
setup = true
received = false
end = false
counter = 0
basic.forever(function () {
    if (setup) {
        basic.showNumber(number)
    } else if (sending) {
        if (counter < 3) {
            basic.showIcon(IconNames.Pitchfork)
            basic.pause(2000)
            radio.sendValue("message", number + 1)
            counter += 1
        } else {
            basic.showIcon(IconNames.No)
            radio.sendValue("end", number)
            sending = false
            end = true
            last = number
            counter = 0
            basic.pause(2000)
        }
    } else if (received) {
        basic.showIcon(IconNames.Yes)
    } else if (end) {
        if (counter == 0) {
            basic.showNumber(last)
            basic.pause(5000)
            counter += 1
        }
        basic.showIcon(IconNames.Happy)
    } else {
        blink = !(blink)
        if (blink) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                # . # . #
                . . . . .
                `)
            basic.pause(200)
        } else {
            basic.clearScreen()
            basic.pause(200)
        }
    }
})

import RPi.GPIO as GPIO, time, datetime, os

GPIO.setmode(GPIO.BCM)

BUTTON = 17
YELLOW_LED = 19
RED_LED = 16

GPIO.setup(YELLOW_LED, GPIO.OUT)
GPIO.setup(RED_LED, GPIO.OUT)
GPIO.setup(BUTTON, GPIO.IN, pull_up_down=GPIO.PUD_UP)

try:
  red = False
  yellow = True
  while True:
    input_state = GPIO.input(BUTTON)
    if input_state == False:
      ts = time.time()
      st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
      print("Button pushed at {}.".format(st))
      GPIO.output(RED_LED, red)
      GPIO.output(YELLOW_LED, yellow)
      print("Red LED is now {}, yellow LED is now {}.".format(red, yellow))
      red, yellow = yellow, red
      time.sleep(0.2)
except KeyboardInterrupt:
  GPIO.cleanup()

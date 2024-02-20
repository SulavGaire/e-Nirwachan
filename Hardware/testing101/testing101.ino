#include <Wire.h>
#include "SSD1306.h"

SSD1306 display(0x3c, 14, 15);  //SDA, SCL;
int i = 0;
const int pin2 = 2;
const int pin16 = 16;
const int pin0 = 0;
const int pin13 = 13;

void setup() {
  display.init();
  pinMode(pin2, INPUT);
  pinMode(pin16, INPUT);
  pinMode(pin0, INPUT);
  pinMode(pin13, INPUT);
}

void loop() {
if (!digitalRead(pin2)){
display.clear();
display.drawString(0, 0,"  High");
display.display();
delay(200);
}
else{
  display.clear();
display.drawString(0, 0,"  Low");
display.display();
delay(200);
}




  // display.clear();
  // display.drawString(1, 0, "2 : accept" + digitalRead(pin2));
  // display.drawString(1, 10, "16 : Next+1 " + digitalRead(pin16));
  // display.drawString(1, 20, "0 : voting/register" + digitalRead(pin0));
  // display.drawString(1, 30, "13 : Next-1" + digitalRead(pin13));
  // display.display();
  // delay(100);
//   if (digitalRead(pin2) == LOW) {
//     Serial.println("Pin 2 is HIGH");
//     display.clear();
//     display.drawString(4, 4, "pin 2 : accept switch");
//     display.display();
//     delay(500);
//   }
//   if (digitalRead(pin16) == LOW) {
//     Serial.println("Pin 4 is HIGH");
//     display.clear();
//     display.drawString(4, 4, "pin 4 : Next+1 switch");
//     display.display();
//     delay(500);

//   }
//   if (digitalRead(pin12) == LOW) {
//     Serial.println("Pin 12 is HIGH");
//     display.clear();
//     display.drawString(4, 4, "pin 12 : voting/register switch");
//     display.display();
//     delay(500);
//   }
//   if (digitalRead(pin13) == LOW) {
//     Serial.println("Pin 13 is HIGH");
//     display.clear();
//     display.drawString(4, 4, "pin 13 : Next-1 switch");
//     display.display();
//     delay(500);
// }

}

// display.clear();
// display.drawString(0, 0, String(i) + ". Tadaa... ");
// display.display();
// delay(2000);  // Pause for 2 seconds
// display.clear();
// i++;
// delay(2000);
// }
//LED BUILT_IN is GPIO 4
// void setup() {
//   pinMode(4, OUTPUT); // Set the pin as output
// }

// // Remember that the pin work with inverted logic
// // LOW to Turn on and HIGH to turn off
// void loop() {
//   digitalWrite(4, LOW); //Turn on
//   delay (1000); //Wait 1 sec
//   digitalWrite(4, HIGH); //Turn off
//   delay (1000); //Wait 1 sec
// }
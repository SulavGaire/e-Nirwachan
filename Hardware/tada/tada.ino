#include <Wire.h>
#include "SSD1306.h"
  
SSD1306  display(0x3c, 14, 15);//SDA, SCL;
int i = 0;
  
void setup() {
  display.init();
}
  
void loop() {
  display.clear();
  display.drawString(0,0, String(i)+". Tadaa... ");
  display.display();
  delay(2000); // Pause for 2 seconds
  display.clear();
  i ++;
  delay(2000);
}
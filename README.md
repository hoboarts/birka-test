# Birka eCommerce beta [Client: REACT + REDUX, Server: NODE.JS EXPRESS, DB: MongoDB]
DEMO https://peaceful-brushlands-57795.herokuapp.com/

HOBO-ART-STUDIO © \
|  contact:   hoboart@zoho.com  |\
|  itch.io:   https://hoboart.itch.io  |\
|  youtube:   https://www.youtube.com/channel/UCJS-Ow6LOZRcrQ7VZ2_V0qA  |\
|  art:   https://www.artstation.com/hidey0shi  |\
|  SIMON ORLOV |

INSTRUCTION \
ECommerce app targeted on ukrainian market. All prices in app uses the rate currency exchange system, \
that's mean rates loading from DB /OR/ Privat public API LIVE currency exchange rates (Ukraine), \
USD -> UAH = RATE * PRICE. All prices of products in DB specified in USD (United States dollar). \
Prices of total order cost in DB specified in UAH (Ukrainian hryvnia). \
Changes of currency rate occurs in admin settings screen. \
! Beware the changing of products/orders/users ID's counter. \
Server will thrown error if detect the same ID ( ID 12 -> ID 12 = ERROR).

Test user: \
email: testuser@example.com \
password: test01

Test admin: \
email: testadmin@example.com \
password: test01

You can easily register new account, now it work without any confirmation email or captcha.

Payment working now in test mode. \
Test payment card: \
4444 5555 6666 1111 \
exp.date: any \
secret code: any

App has support: \
Localization in russian, ukranian, english languages. \
Registration & authentication of users, admin privileges. \
Ordered product management for users. \
Product reviews & rating. \
Customized paybutton of *_NOT_FOR_AD_NAME_* bank (Ukraine) visa/master card payment. \
Dashboard on Google Chart. \
Products/Orders/User management in admin settings screen. \
Orders payment & delivery management in admin settings screen. \
Adding up to 3 mobile numbers on header of home screen. \
Specifying product on discount. \
Uploading up to 3 images for product on server. \
Product decrement auto/manual switch, after purchase. \
Chat support admin-to-consumers messaging.

Known issues and planned updates:
- Infinitely loading of paybutton (press update button in your browser). \
Pending server response of *_NOT_FOR_AD_NAME_* bank (Ukraine). 
- Adding management for product's image files.
- Visual appearance of app elaboration.
# Birka eCommerce beta [Client: REACT + REDUX, Server: NODE.JS EXPRESS, DB: MongoDB]
DEMO https://peaceful-brushlands-57795.herokuapp.com/

contact:   hoboart@zoho.com

INSTRUCTION \
ECommerce app targeted on ukrainian market. All prices in app uses the rate currency exchange system, \
that's mean rates loading from DB or, at discretion, Privatbank public API LIVE currency exchange rates (Ukraine), \
USD -> UAH = RATE * PRICE. All prices of products in DB specified in USD (United States dollar). \
Prices of total order cost in DB specified in UAH (Ukrainian hryvnia). \
Changes of currency rate occurs in admin settings screen.

!Beware the changing of products|orders|users ID's counter! \
Server will thrown error if detect the same ID ( ID 12 -> ID 12 = ERROR).

Storing of product's images is temporary on herokuapp.com. If you upload new jpgs, it will be erased
automatically at the end of the day or even earlier. Need to implement AWS S3.

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
Registration & authentication of users with JWT, admin privileges. \
Ordered product management for users. \
Product reviews & rating. \
Customized paybutton of Tascombank API (Ukraine) visa/master card payment. \
Dashboard on Google Chart. \
Products/Orders/User management in admin settings screen. \
Orders payment & delivery management in admin settings screen. \
Adding up to 3 mobile numbers on header of home screen. \
Specifying product on discount. \
Uploading up to 3 images for product on server. \
Product decrement auto/manual switch, after purchase. \
Chat support admin-to-consumers messaging.

Known issues and planned updates:
- Infinitely loading of paybutton (try refresh (CTRL+R) button in your browser). \
Pending loading of script from Tascombank API (Ukraine).
- Adding file management for image files with storage on AWS S3.
- Landing page, elaboration of visual appearance of the app.
ionic start gamingApp
cd ./devdacticApp
 
# Manage your authentication state (and API calls)
ionic g service services/authentication
 
# Additional Pages
ionic g page pages/intro
ionic g page pages/login
ionic g page pages/tabs-menu
 
# Secure inside area
ionic g guard guards/auth --implements CanLoad
 
# Show intro automatically once
ionic g guard guards/intro --implements CanLoad
 
# Automatically log in users
ionic g guard guards/autoLogin --implements CanLoad

# Install Storage json web token 
npm i @ionic/storage @auth0/angular-jwt


# Add SplashScreen 
ionic cordova plugin add cordova-plugin-splashscreen
npm install @ionic-native/splash-screen

# Add Status 
ionic cordova plugin add cordova-plugin-statusbar
npm install @ionic-native/status-bar


#add app.module
=> import { HttpClientModule } from '@angular/common/http';



Add 10% on newgame pages
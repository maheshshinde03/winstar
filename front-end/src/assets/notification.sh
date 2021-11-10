this.localNotifications.schedule([
          { 
          id: 1,
          text: "5 Minuts to left submit your final game points",
          title: 'Alert!!! ', 
          data:{mydata:"Submit your game points"},
          icon: "assets/img/bell.png",
          // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          smallIcon: "assets/img/bell.png",
          color: '#ac9fa9',
          lockscreen: true,
          vibrate: true,
          launch: true,
          foreground: true,
          wakeup: true,
          led: '#ff00c3',
          trigger: { 
            // every: {
            //   hour: 10,
            //   minute: 40
            // },
          count : 1,
            in: 5, every:  ELocalNotificationTriggerUnit.SECOND 
          } 
          },
          // { 
          //   id: 2,
          //   text: "5 Minuts to left submit your final game points",
          //   title: 'Alert!!! ', 
          //   icon: "assets/img/bell.png",
          //   // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          //   smallIcon: "assets/img/bell.png",
          //   color: '#000000',
          //   lockscreen: true,
          //   vibrate: true,
          //   launch: true,
          //   foreground: true,
          //   wakeup: true,
          //   led: '#ff00c3',
          //   trigger: { 
          //     every: {
          //       hour: 11,
          //       minute: 40
          //     } ,
          //   count : 1,
          //     // in: 1, every:  ELocalNotificationTriggerUnit.MINUTE 
          //   } 
          // },
          // { 
          //   id: 3,
          //   text: "5 Minuts to left submit your final game points",
          //   title: 'Alert!!! ', 
          //   icon: "assets/img/bell.png",
          //   // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          //   smallIcon: "assets/img/bell.png",
          //   color: '#000000',
          //   lockscreen: true,
          //   vibrate: true,
          //   launch: true,
          //   foreground: true,
          //   wakeup: true,
          //   led: '#ff00c3',
          //   trigger: { 
          //     every: {
          //       hour: 12,
          //       minute: 40
          //     } ,
          //     count : 1,
          //     // in: 1, every:  ELocalNotificationTriggerUnit.MINUTE 
          //   } 
          // },
          // { 
          //   id: 4,
          //   text: "5 Minuts to left submit your final game points",
          //   title: 'Alert!!! ', 
          //   icon: "assets/img/bell.png",
          //   // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          //   smallIcon: "assets/img/bell.png",
          //   color: '#000000',
          //   lockscreen: true,
          //   vibrate: true,
          //   launch: true,
          //   foreground: true,
          //   wakeup: true,
          //   led: '#ff00c3',
          //   trigger: { 
          //     every: {
          //       hour: 13,
          //       minute: 40
          //     } ,
          //     count:1,
          //     // in: 1, every:  ELocalNotificationTriggerUnit.MINUTE 
          //   } 
          // },
          // { 
          //   id: 5,
          //   text: "5 Minuts to left submit your final game points",
          //   title: 'Alert!!! ', 
          //   icon: "assets/img/bell.png",
          //   // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          //   smallIcon: "assets/img/bell.png",
          //   color: '#000000',
          //   lockscreen: true,
          //   vibrate: true,
          //   launch: true,
          //   foreground: true,
          //   wakeup: true,
          //   trigger: { 
          //     every: {
          //       hour: 14,
          //       minute: 40
          //     } ,
          //     count : 1,
          //     // in: 1, every:  ELocalNotificationTriggerUnit.MINUTE 
          //   } 
          //   },
          //   { 
          //     id: 6,
          //     text: "5 Minuts to left submit your final game points",
          //     title: 'Alert!!! ', 
          //     icon: "assets/img/bell.png",
          //     // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          //     smallIcon: "assets/img/bell.png",
          //     color: '#000000',
          //     lockscreen: true,
          //     vibrate: true,
          //     launch: true,
          //     foreground: true,
          //     wakeup: true,
          //     led: '#ff00c3',
          //     trigger: { 
          //       every: {
          //         hour: 15,
          //         minute: 40
          //       } ,
          //       count:1,
          //       // in: 1, every:  ELocalNotificationTriggerUnit.MINUTE 
          //     } 
          //     },
          //     { 
          //       id: 7,
          //       text: "5 Minuts to left submit your final game points",
          //       title: 'Alert!!! ', 
          //       icon: "assets/img/bell.png",
          //       // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          //       smallIcon: "assets/img/bell.png",
          //       color: '#000000',
          //       lockscreen: true,
          //       vibrate: true,
          //       launch: true,
          //       foreground: true,
          //       wakeup: true,
          //       led: '#ff00c3',
          //       trigger: { 
          //         every: {
          //           hour: 16,
          //           minute: 40
          //         } ,
          //         count:1,
          //         // in: 1, every:  ELocalNotificationTriggerUnit.MINUTE 
          //       } 
          //     },
          //     { 
          //       id: 8,
          //       text: "5 Minuts to left submit your final game points",
          //       title: 'Alert!!! ', 
          //       icon: "assets/img/bell.png",
          //       // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          //       smallIcon: "assets/img/bell.png",
          //       color: '#000000',
          //       lockscreen: true,
          //       vibrate: true,
          //       launch: true,
          //       foreground: true,
          //       wakeup: true,
          //       led: '#ff00c3',
          //       trigger: { 
          //         every: {
          //           hour: 17,
          //           minute: 40
          //         } ,
          //         count:1,
          //         // in: 1, every:  ELocalNotificationTriggerUnit.MINUTE 
          //       } 
          //     },
          //   { 
          //   id: 9,
          //   text: "5 Minuts to left submit your final game points",
          //   title: 'Alert!!! ', 
          //   icon: "assets/img/bell.png",
          //   // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          //   smallIcon: "assets/img/bell.png",
          //   color: '#000000',
          //   lockscreen: true,
          //   vibrate: true,
          //   launch: true,
          //   foreground: true,
          //   wakeup: true,
          //   led: '#ff00c3',
          //   trigger: { 
          //     every: {
          //       hour: 18,
          //       minute: 40
          //     } ,
          //     count:1,
          //     // in: 1, every:  ELocalNotificationTriggerUnit.MINUTE 
          //   } 
          //   },
          //   { 
          //     id: 10,
          //     text: "5 Minuts to left submit your final game points",
          //     title: 'Alert!!! ', 
          //     icon: "assets/img/bell.png",
          //     // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          //     smallIcon: "assets/img/bell.png",
          //     color: '#000000',
          //     lockscreen: true,
          //     vibrate: true,
          //     launch: true,
          //     foreground: true,
          //     wakeup: true,
          //     led: '#ff00c3',
          //     trigger: { 
          //       every: {
          //         hour: 19,
          //         minute: 40
          //       } ,
          //       count:1,
          //       // in: 1, every:  ELocalNotificationTriggerUnit.MINUTE 
          //     } 
          //   },
          //   { 
          //     id: 11,
          //     text: "5 Minuts to left submit your final game points",
          //     title: 'Alert!!! ', 
          //     icon: "assets/img/bell.png",
          //     // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          //     smallIcon: "assets/img/bell.png",
          //     color: '#000000',
          //     lockscreen: true,
          //     vibrate: true,
          //     launch: true,
          //     foreground: true,
          //     wakeup: true,
          //     led: '#ff00c3',
          //     trigger: { 
          //       every: {
          //         hour: 20,
          //         minute: 40
          //       } ,
          //       count:1,
          //       // in: 1, every:  ELocalNotificationTriggerUnit.MINUTE 
          //     } 
          //     },
          //     { 
          //       id: 12,
          //       text: "5 Minuts to left submit your final game points",
          //       title: 'Alert!!! ', 
          //       icon: "assets/img/bell.png",
          //       // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          //       smallIcon: "assets/img/bell.png",
          //       color: '#000000',
          //       lockscreen: true,
          //       vibrate: true,
          //       launch: true,
          //       foreground: true,
          //       wakeup: true,
          //       led: '#ff00c3',
          //       trigger: { 
          //         every: {
          //           hour: 21,
          //           minute: 40
          //         },
          //         count:1
          //         // in: 1, every:  ELocalNotificationTriggerUnit.MINUTE 
          //       } 
          //       },
        ]
          
        );
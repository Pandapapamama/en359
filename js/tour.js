document.addEventListener('DOMContentLoaded', function() {

    // --- Configuration for the Virtual Tour ---
    const tourConfig = {
        "default": {
            "firstScene": "start",
            "autoLoad": true,
            "autoRotate": 2,
            "sceneFadeDuration": 1000
        },
        "scenes": {
            // Scene 1: จุดเริ่มต้นหน้าอาคาร
            "start": {
                "title": "หน้าอาคาร (จุดเริ่มต้น)",
                "panorama": "images/start.jpg",
                "hotSpots": [{
                    "pitch": -3.5, "yaw": 114, "type": "scene",
                    "text": "เข้าไปด้านซ้าย", "sceneId": "floor1left"
                }, {
                    "pitch": -4.5, "yaw": -130, "type": "scene",
                    "text": "เข้าไปด้านขวา", "sceneId": "floor1right"
                }]
            },
            // Scene 2: ภายในอาคารฝั่งขวา
            "floor1right": {
                "title": "โถงทางเดินฝั่งขวา",
                "panorama": "images/floor1right.JPG",
                "hotSpots": [{
                    "pitch": -10.9, "yaw": -37.3, "type": "scene",
                    "text": "ไปที่นั่งพัก", "sceneId": "chair"
                }, {
                    "pitch": -7.7, "yaw": 28.8, "type": "scene",
                    "text": "กลับไปหน้าอาคาร", "sceneId": "start"
                }, {
                    "pitch": 25.3, "yaw": -71.7, "type": "scene",
                    "text": "ขึ้นชั้น 2", "sceneId": "infloor2" // แก้ไข: เปลี่ยนเป้าหมายไปที่โถงบันได
                }]
            },
            // Scene 3: ภายในอาคารฝั่งซ้าย
            "floor1left": {
                "title": "โถงทางเดินฝั่งซ้าย",
                "panorama": "images/floor1left.JPG",
                "hotSpots": [{
                    "pitch": -8.9, "yaw": -166.6, "type": "scene",
                    "text": "ไปทางฝั่งขวา", "sceneId": "floor1right"
                }, {
                    "pitch": -22.7, "yaw": -109.9, "type": "scene",
                    "text": "กลับไปหน้าอาคาร", "sceneId": "start"
                }, {
                    "pitch": 6.3, "yaw": 176.6, "type": "scene",
                    "text": "ขึ้นชั้น 2", "sceneId": "infloor2" // เพิ่ม: ทางขึ้นจากฝั่งซ้าย
                }]
            },
            // Scene 4: ที่นั่งพัก
            "chair": {
                "title": "ที่นั่งพัก",
                "panorama": "images/rest.jpg",
                "hotSpots": [{
                    "pitch": -23.6, "yaw": 25, "type": "scene",
                    "text": "กลับไปโถงทางเดิน", "sceneId": "floor1right"
                }]
            },
            
            // --- ส่วนของชั้น 2 ที่ปรับปรุงใหม่ ---
            
            // Scene 5: โถงบันไดชั้น 2 (จุดเชื่อมต่อ)
            "infloor2": {
                "title": "โถงบันไดชั้น 2",
                "panorama": "images/infloor2.JPG",
                "hotSpots": [
                    { // จุดที่ 1: เข้าไปในห้องชั้น 2
                        "pitch": -20.0,
                        "yaw": 99.6,
                        "type": "scene",
                        "text": "เข้าไปในห้องโถง",
                        "sceneId": "floor2"
                    },
                    { // จุดที่ 2: กลับลงไปชั้น 1
                        "pitch": -17.1,
                        "yaw": -20.1,
                        "type": "scene",
                        "text": "ลงไปชั้น 1",
                        "sceneId": "floor1left"
                    },
                    { // จุดที่ 3: ออกไปนอกระเบียง (จากโค้ดเดิม scene 'inner2floor')
                        "pitch": -3.8,
                        "yaw": -82.8,
                        "type": "scene",
                        "text": "ออกไประเบียง",
                        "sceneId": "inner2floor" 
                    }
                ]
            },
            // Scene 6: ห้องโถงชั้น 2
            "floor2": {
                "title": "ห้องโถงชั้น 2",
                "panorama": "images/floor2.JPG",
                "hotSpots": [{
                    "pitch": -4.8, "yaw": 155.9, "type": "scene",
                    "text": "กลับไปโถงบันได", "sceneId": "infloor2"
                }]
            },
            // Scene 7: ระเบียงชั้น 2
            "inner2floor": {
                "title": "ระเบียงชั้น 2",
                "panorama": "images/inner2floor.JPG",
                "hotSpots": [{
                    "pitch": -6.3, "yaw": -111.2, "type": "scene",
                    "text": "กลับเข้าอาคาร", "sceneId": "infloor2"
                }]
            }
        }
    };

    // --- Initialize Pannellum Viewer ---
    const viewer = pannellum.viewer('panorama', tourConfig);

    // --- Populate Scene Selector Dropdown ---
    const sceneList = document.getElementById('scene-list');
    const scenes = tourConfig.scenes;
    for (let sceneId in scenes) {
        let option = document.createElement('option');
        option.value = sceneId;
        option.innerText = scenes[sceneId].title;
        sceneList.appendChild(option);
    }
    
    // --- Add Event Listener to the Button ---
    document.getElementById('goto-scene-btn').addEventListener('click', function() {
        const selectedScene = sceneList.value;
        viewer.loadScene(selectedScene);
    });

    // --- For Development: Log coordinates on click ---
    viewer.on('mousedown', function (event) {
        const coords = viewer.mouseEventToCoords(event);
        console.log(`Pitch: ${coords[0]}, Yaw: ${coords[1]}`);
    });
});
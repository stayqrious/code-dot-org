# Setup :CODE-DOT-ORG:

###  Prerequisites

- Nodejs >= 14.15.1
- npm >= 6.14.8


- **Clone `sq_web`**

  - This repository deals with backend code for StayQrious.

    ```bash
    git clone -depth 1 https://github.com/stayqrious/code-dot-org.git -b sq  #https
    ```

    ```bash
    git clone -depth 1 git@github.com:stayqrious/code-dot-org.git -b sq #ssh
    ```
    
- **Install requirements**
  ```bash
  
      cd code-dot-org/apps && npm install
  ```
- Add files 
  
  * `sharedConstants.js`  in `app/src/util/`  with below content
  ```js 
  /* eslint-disable */
  // This is a generated file and SHOULD NOT BE EDITED MANUALLY!!
  // Contents are generated as part of grunt build
  // Source of truth is lib/cdo/shared_constants.rb and files in lib/cdo/shared_constants/
  export const ArtistAutorunOptions = {
    "limited_auto_run": "LIMITED_AUTO_RUN",
    "full_auto_run": "FULL_AUTO_RUN"
  };
  export const LevelKind = {
    "peer_review": "peer_review",
    "assessment": "assessment",
    "puzzle": "puzzle",
    "unplugged": "unplugged",
    "level": "level",
    "stage_extras": "stage_extras"
  };
  export const LevelStatus = {
    "not_tried": "not_tried",
    "submitted": "submitted",
    "locked": "locked",
    "readonly": "readonly",
    "perfect": "perfect",
    "passed": "passed",
    "attempted": "attempted",
    "review_accepted": "review_accepted",
    "review_rejected": "review_rejected",
    "dots_disabled": "dots_disabled",
    "free_play_complete": "free_play_complete",
    "completed_assessment": "completed_assessment"
  };
  export const SectionLoginType = {
    "word": "word",
    "picture": "picture",
    "email": "email",
    "google_classroom": "google_classroom",
    "clever": "clever"
  };
  export const PostMilestoneMode = {
    "all": "all",
    "successful_runs_and_final_level_only": "successful_runs_and_final_level_only",
    "final_level_only": "final_level_only"
  };
  export const AlwaysPublishableProjectTypes = [
    "artist",
    "frozen",
    "playlab",
    "gumball",
    "iceage",
    "infinity",
    "minecraft_adventurer",
    "minecraft_designer",
    "minecraft_hero",
    "minecraft_aquatic",
    "starwars",
    "starwarsblocks",
    "starwarsblocks_hour",
    "flappy",
    "bounce",
    "sports",
    "basketball",
    "artist_k1",
    "playlab_k1",
    "dance",
    "spritelab"
  ];
  export const AllPublishableProjectTypes = [
    "artist",
    "frozen",
    "playlab",
    "gumball",
    "iceage",
    "infinity",
    "minecraft_adventurer",
    "minecraft_designer",
    "minecraft_hero",
    "minecraft_aquatic",
    "starwars",
    "starwarsblocks",
    "starwarsblocks_hour",
    "flappy",
    "bounce",
    "sports",
    "basketball",
    "artist_k1",
    "playlab_k1",
    "dance",
    "spritelab",
    "applab",
    "gamelab"
  ];
  export const ConditionallyPublishableProjectTypes = [
    "applab",
    "gamelab"
  ];
  export const AllowedWebRequestHeaders = [
    "Authorization"
  ];
  export const AbuseConstants = {
    "ABUSE_THRESHOLD": 15
  };
  export const ErrorSeverityLevels = {
    "WARN": 2,
    "ERROR": 3,
    "FATAL": 4
  };     
  ```
  * `sharedGamelabBlocks.js` in `apps/p5lab/gamelab`
  ```js 
    export const GamelabBlocks = {
          // Game Lab
          "draw": null,
          "drawSprites": null,
          "playSound": null,
          "stopSound": null,
          "keyDown": null,
          "keyWentDown": null,
          "keyWentUp": null,
          "mouseDidMove": null,
          "mouseDown": null,
          "mouseIsOver": null,
          "mouseWentDown": null,
          "mouseWentUp": null,
          "mousePressedOver": null,
          "showMobileControls": null,
          "World.mouseX": null,
          "World.mouseY": null,
          "World.frameRate": null,
          "World.frameCount": null,
          "World.seconds": null,
          "World.width": null,
          "World.height": null,
          "World.allSprites": null,
          "camera.on": null,
          "camera.off": null,
          "camera.isActive": null,
          "camera.mouseX": null,
          "camera.mouseY": null,
          "camera.x": null,
          "camera.y": null,
          "camera.zoom": null,
          "comment_GameLab": null,
          // Sprites
          "var sprite = createSprite": null,
          "setAnimation": null,
          "x": null,
          "y": null,
          "velocityX": null,
          "velocityY": null,
          "scale": null,
          "sprite.height": null,
          "sprite.width": null,
          "visible": null,
          "rotation": null,
          "rotationSpeed": null,
          "rotateToDirection": null,
          "debug": null,
          "isTouching": null,
          "collide": null,
          "displace": null,
          "overlap": null,
          "bounce": null,
          "bounceOff": null,
          "bounciness": null,
          "setCollider": null,
          "createEdgeSprites": null,
          "shapeColor": null,
          "tint": null,
          "setVelocity": null,
          "getDirection": null,
          "getSpeed": null,
          "setSpeedAndDirection": null,
          "pointTo": null,
          "mirrorX": null,
          "mirrorY": null,
          "getScaledWidth": null,
          "getScaledHeight": null,
          "lifetime": null,
          "nextFrame": null,
          "pause": null,
          "play": null,
          "setFrame": null,
          "depth": null,
          "destroy": null,
          "comment_Sprites": null,
          // Groups
          "var group = createGroup": null,
          "add": null,
          "remove": null,
          "clear": null,
          "contains": null,
          "get": null,
          "group.isTouching": null,
          "group.bounce": null,
          "group.bounceOff": null,
          "group.collide": null,
          "group.displace": null,
          "group.overlap": null,
          "maxDepth": null,
          "minDepth": null,
          "destroyEach": null,
          "pointToEach": null,
          "setAnimationEach": null,
          "setColorEach": null,
          "setColliderEach": null,
          "setDepthEach": null,
          "setHeightEach": null,
          "setLifetimeEach": null,
          "setMirrorXEach": null,
          "setMirrorYEach": null,
          "setRotateToDirectionEach": null,
          "setRotationEach": null,
          "setRotationSpeedEach": null,
          "setScaleEach": null,
          "setSpeedAndDirectionEach": null,
          "setTintEach": null,
          "setVelocityEach": null,
          "setVelocityXEach": null,
          "setVelocityYEach": null,
          "setVisibleEach": null,
          "setWidthEach": null,
          "comment_Groups": null,
          // Drawing
          "background": null,
          "fill": null,
          "noFill": null,
          "stroke": null,
          "strokeWeight": null,
          "noStroke": null,
          "rgb": null,
          "rect": null,
          "ellipse": null,
          "text": null,
          "textAlign": null,
          "textFont": null,
          "textSize": null,
          "arc": null,
          "line": null,
          "point": null,
          "regularPolygon": null,
          "shape": null,
          "comment_Drawing": null,
          // Control
          "forLoop_i_0_4": null,
          "ifBlock": null,
          "ifElseBlock": null,
          "whileBlock": null,
          "comment_Control": null,
          // Math
          "addOperator": null,
          "subtractOperator": null,
          "multiplyOperator": null,
          "divideOperator": null,
          "equalityOperator": null,
          "inequalityOperator": null,
          "greaterThanOperator": null,
          "greaterThanOrEqualOperator": null,
          "lessThanOperator": null,
          "lessThanOrEqualOperator": null,
          "andOperator": null,
          "orOperator": null,
          "notOperator": null,
          "randomNumber_min_max": null,
          "mathRound": null,
          "mathAbs": null,
          "mathMax": null,
          "mathMin": null,
          "mathRandom": null,
          "comment_Math": null,
          // Variables
          "declareAssign_x": null,
          "declareNoAssign_x": null,
          "assign_x": null,
          "console.log": null,
          "declareAssign_str_hello_world": null,
          "substring": null,
          "indexOf": null,
          "includes": null,
          "length": null,
          "toUpperCase": null,
          "toLowerCase": null,
          "declareAssign_list_abd": null,
          "listLength": null,
          "comment_Variables": null,
          // Functions
          "functionParams_none": null,
          "functionParams_n": null,
          "callMyFunction": null,
          "callMyFunction_n": null,
          "return": null,
          "comment": null
        }  
  ```
  
- **Start server**
  ```bash
      cd code-dot-org/apps && sh serve.sh
  ```
  
  * once build is complete 
    * copy the contents of `apps/build/package//assets/js/manifest.js`
    * create a new entry in http://localhost:8000/api/admin/coding_activities/codeorgmanifest/
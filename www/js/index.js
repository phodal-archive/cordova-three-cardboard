/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        window.addEventListener('orientationchange', function(){ window.setTimeout( app.orientationChange, 300 )  } )
        window.addEventListener('deviceorientation', app.updateOrientation )
    },
    onDeviceReady: function() {
        screen.lockOrientation('landscape');
        app.receivedEvent('deviceready');
    },
    updateOrientation: function(orientation){
        app.deviceAlpha = orientation.alpha;
        app.deviceGamma = orientation.gamma;
        app.deviceBeta = orientation.beta;
    },
    orientationChange: function() {
        if( window.orientation == 0 ){
            app.betaAxis = 'x';
            app.gammaAxis = 'y';
            app.betaAxisInversion = -1;
            app.gammaAxisInversion = -1;
        }else{
            app.betaAxis = 'y';
            app.gammaAxis = 'x';
            app.betaAxisInversion = window.orientation / Math.abs(window.orientation) * -1;
            app.gammaAxisInversion = window.orientation / Math.abs(window.orientation)
        }
        var w = window.innerWidth * window.devicePixelRatio;
        var h = window.innerHeight * window.devicePixelRatio;
        app.renderer.setSize( w, h );
        app.camera.aspect = w/h;
        app.camera.updateProjectionMatrix();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // Global scene object
        var scene;

        // Global camera object
        var camera;

        // Initialize the scene
        initializeScene();

        // Render the scene (map the 3D world to the 2D scene)
        renderScene();

        /**
         * Initialze the scene.
         */
        function initializeScene(){
            app.deviceAlpha = null;
            app.deviceGamma = null;
            app.deviceBeta = null;
            app.betaAxis = 'x';
            app.gammaAxis = 'y';
            app.betaAxisInversion = -1;
            app.gammaAxisInversion = -1;

            document.body.style.zoom = 1 / window.devicePixelRatio;
            var w = window.innerWidth * window.devicePixelRatio;
            var h = window.innerHeight * window.devicePixelRatio;

            app.scene = new THREE.Scene();
            app.camera = new THREE.PerspectiveCamera( 75, w/h, 0.1, 1000 )
            app.renderer = new THREE.WebGLRenderer({antialias: true});
            app.renderer.setSize( w,h );

            // Get the DIV element from the HTML document by its ID and append the renderers DOM
            // object to it
            document.getElementById("WebGLCanvas").appendChild(app.renderer.domElement);

            // Create the scene, in which all objects are stored (e. g. camera, lights,
            // geometries, ...)

            // After definition, the camera has to be added to the scene.
            camera = new THREE.PerspectiveCamera(45, w / h, 1, 100);
            camera.position.set(0, 0, 10);
            camera.lookAt(scene.position);
            app.scene.add(camera);

            // 3. Define the faces by setting the vertices indices
            var triangleGeometry = new THREE.Geometry();
            triangleGeometry.vertices.push(new THREE.Vector3( 0.0,  1.0, 0.0));
            triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
            triangleGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0));
            triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

            var triangleMaterial = new THREE.MeshBasicMaterial({
                color:0xFFFFFF,
                side:THREE.DoubleSide
            });

            var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
            triangleMesh.position.set(-1.5, 0.0, 4.0);
            app.scene.add(triangleMesh);

            var squareGeometry = new THREE.Geometry();
            squareGeometry.vertices.push(new THREE.Vector3(-1.0,  1.0, 0.0));
            squareGeometry.vertices.push(new THREE.Vector3( 1.0,  1.0, 0.0));
            squareGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0));
            squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
            squareGeometry.faces.push(new THREE.Face3(0, 1, 2));
            squareGeometry.faces.push(new THREE.Face3(0, 2, 3));

            // Create a white basic material and activate the 'doubleSided' attribute.
            var squareMaterial = new THREE.MeshBasicMaterial({
                color:0xFFFFFF,
                side:THREE.DoubleSide
            });

            var squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
            squareMesh.position.set(1.5, 0.0, 4.0);
            app.scene.add(squareMesh);
        }

        /**
         * Render the scene. Map the 3D world to the 2D screen.
         */
        function renderScene(){
            app.renderer.render(scene, camera);
        }
    }
};

app.initialize();
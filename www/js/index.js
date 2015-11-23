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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
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
            // Check whether the browser supports WebGL. If so, instantiate the hardware accelerated
            // WebGL renderer. For antialiasing, we have to enable it. The canvas renderer uses
            // antialiasing by default.
            // The approach of multiple renderers is quite nice, because your scene can also be
            // viewed in browsers, which don't support WebGL. The limitations of the canvas renderer
            // in contrast to the WebGL renderer will be explained in the tutorials, when there is a
            // difference.
            if(Detector.webgl){
                renderer = new THREE.WebGLRenderer({antialias:true});

                // If its not supported, instantiate the canvas renderer to support all non WebGL
                // browsers
            } else {
                renderer = new THREE.CanvasRenderer();
            }

            // Set the background color of the renderer to black, with full opacity
            renderer.setClearColor(0x000000, 1);

            // Get the size of the inner window (content area) to create a full size renderer
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;

            // Set the renderers size to the content areas size
            renderer.setSize(canvasWidth, canvasHeight);

            // Get the DIV element from the HTML document by its ID and append the renderers DOM
            // object to it
            document.getElementById("WebGLCanvas").appendChild(renderer.domElement);

            // Create the scene, in which all objects are stored (e. g. camera, lights,
            // geometries, ...)
            scene = new THREE.Scene();

            // Now that we have a scene, we want to look into it. Therefore we need a camera.
            // Three.js offers three camera types:
            //  - PerspectiveCamera (perspective projection)
            //  - OrthographicCamera (parallel projection)
            //  - CombinedCamera (allows to switch between perspective / parallel projection
            //    during runtime)
            // In this example we create a perspective camera. Parameters for the perspective
            // camera are ...
            // ... field of view (FOV),
            // ... aspect ratio (usually set to the quotient of canvas width to canvas height)
            // ... near and
            // ... far.
            // Near and far define the cliping planes of the view frustum. Three.js provides an
            // example (http://mrdoob.github.com/three.js/examples/
            // -> canvas_camera_orthographic2.html), which allows to play around with these
            // parameters.
            // The camera is moved 10 units towards the z axis to allow looking to the center of
            // the scene.
            // After definition, the camera has to be added to the scene.
            camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 100);
            camera.position.set(0, 0, 10);
            camera.lookAt(scene.position);
            scene.add(camera);

            // Create the triangle (or any arbitrary geometry).
            // 1. Instantiate the geometry object
            // 2. Add the vertices
            // 3. Define the faces by setting the vertices indices
            var triangleGeometry = new THREE.Geometry();
            triangleGeometry.vertices.push(new THREE.Vector3( 0.0,  1.0, 0.0));
            triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
            triangleGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0));
            triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

            // To color the surface, a material has to be created. If all faces have the same color,
            // the THREE.MeshBasicMaterial fits our needs. It offers a lot of attributes (see
            // https://github.com/mrdoob/three.js/blob/master/src/materials/MeshBasicMaterial.js)
            // from which we need in this lesson only 'color'.

            // Create a white basic material and activate the 'doubleSided' attribute to force the
            // rendering of both sides of each face (front and back). This prevents the so called
            // 'backface culling'. Usually, only the side is rendered, whose normal vector points
            // towards the camera. The other side is not rendered (backface culling). But this
            // performance optimization sometimes leads to wholes in the surface. When this happens
            // in your surface, simply set 'doubleSided' to 'true'.
            var triangleMaterial = new THREE.MeshBasicMaterial({
                color:0xFFFFFF,
                side:THREE.DoubleSide
            });

            // Create a mesh and insert the geometry and the material. Translate the whole mesh
            // by -1.5 on the x axis and by 4 on the z axis. Finally add the mesh to the scene.
            var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
            triangleMesh.position.set(-1.5, 0.0, 4.0);
            scene.add(triangleMesh);

            // The creation of the square is done in the same way as the triangle, except of the
            // face definition. Instead of using one THREE.Face3, we have to define two
            // THREE.Face3 objects.
            // 1. Instantiate the geometry object
            // 2. Add the vertices
            // 3. Define the faces by setting the vertices indices
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

            // Create a mesh and insert the geometry and the material. Translate the whole mesh
            // by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.
            var squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
            squareMesh.position.set(1.5, 0.0, 4.0);
            scene.add(squareMesh);
        }

        /**
         * Render the scene. Map the 3D world to the 2D screen.
         */
        function renderScene(){
            renderer.render(scene, camera);
        }
    }
};

app.initialize();
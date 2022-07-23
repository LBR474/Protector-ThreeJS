<!DOCTYPE html>
<html>

<head>
    <script src="jquery-3.6.0.min.js"></script>
    <script type="module" src="floor_roller_script_module_d.js"></script>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
        }

        /* Style the header */
        .header {
            background-color: #f1f1f1;
            padding: 20px;
            text-align: center;
        }



        /* Create two unequal columns that floats next to each other */
        .column {
            float: left;
            padding: 10px;
        }

        /* Left and right column */
        .column_side {

            position: fixed;
            top: '0px';
            left: '0px';
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            background-color: #333;
            color: #f1f1f1;

            width: 10%;

        }

        .column_side a {
            float: left;
            display: block;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }


        .column_side a:hover {
            background-color: white;
            color: aqua;
        }


        .div2 {

            position: fixed;
            top: '100px';
            left: '0px';
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            background-color: #333;
            color: #f1f1f1;

            width: 10%;
            display: none;
        }

        .div2 a {
            float: left;
            display: block;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }


        .div2 a:hover {
            background-color: white;
            color: aqua;
        }




        /* Middle column */
        .column.middle {
            width: 100%;
        }

        .column.middle2 {
            width: 85%;
            /* display: none; */
        }

        /* Clear floats after the columns */
        .row:after {
            content: "";
            display: table;
            clear: both;
        }

        #c {
            width: 100%;
            height: 100%;
            display: block;
            border-style: dashed;
            border-width: 2px;
        }

        #d {
            width: 100%;
            height: 100%;
            display: none;
            border-style: dotted;
            border-width: 2px;
        }

        /* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
        @media screen and (max-width: 600px) {

            .column.side,
            .column.middle {
                width: 100%;
            }
        }
    </style>


</head>

<body>

    <div id="div1">
        <p>Text from div 1</p>

    </div>
    <div id="div2">
        <p>Text from div 2</p>

    </div>





    <div id="div3" name="div3">


        <canvas id="c"></canvas>


        </p>
    </div>


</body>

</html>
console.log('Common JavaScript code.');

function header() {
    const targetElement = document.getElementById('headed');;

    var html = `<header id="header" class="fixed-top d-flex align-items-center ">
                    <div class="container d-flex align-items-center justify-content-between ">

                        <div class="logo">
                        <h1><a href="https://aethom00.github.io/index.html">Ashton <span class="name-part">Thomas</span></a></h1>
                        </div>

                        <nav id="navbar" class="navbar">
                        <ul>
                            <li><a class="nav-link scrollto active" href="https://aethom00.github.io/">Home</a></li>
                            <li><a class="nav-link scrollto" href="https://aethom00.github.io/#about">About</a></li>
                            <li><a class="nav-link scrollto" href="https://aethom00.github.io/#skills">Skills</a></li>
                            <li><a class="nav-link scrollto " href="https://aethom00.github.io/#portfolio">Portfolio</a></li>
                            <li><a class="nav-link scrollto " href="https://aethom00.github.io/projects">Projects Page</a></li>
                            <li class="dropdown"><a href="#"><span>Other Pages</span> <i class="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="https://aethom00.github.io/maintenance">Class Reviews</a></li>
                                <li class="dropdown"><a href="#"><span>Projects</span> <i class="bi bi-chevron-right"></i></a>
                                <ul>
                                    <li><a href="https://aethom00.github.io/370_p2l">Assembly Linker</a></li>
                                    <li><a href="https://aethom00.github.io/370_p1s">Assembly Simulator</a></li>
                                    <li><a href="https://aethom00.github.io/segway">Balancing Segway</a></li>
                                    <li><a href="https://aethom00.github.io/281_p3">Bank Simulator</a></li>
                                    <li><a href="https://aethom00.github.io/370_p4">Cache Simulator</a></li>
                                    <li><a href="https://aethom00.github.io/rocket">Calculating Rocket Payloads</a></li>
                                    <li><a href="https://aethom00.github.io/calculating_Alaskan_precipitation">Computing Precipitation</a></li>
                                    <li><a href="https://aethom00.github.io/euchre">Euchre Simulation</a></li>
                                    <li><a href="https://aethom00.github.io/geoguessr">Geoguessr AI</a></li>
                                    <li><a href="https://aethom00.github.io/image_resizing">Image Resizing</a></li>
                                    <li><a href="https://aethom00.github.io/instagram">Instagram Clone</a></li>
                                    <li><a href="https://aethom00.github.io/k-means">K-Means Clustering</a></li>
                                    <li><a href="https://aethom00.github.io/370_p2a">Machine Code Generator</a></li>
                                    <li><a href="https://aethom00.github.io/maze">Maze Solver</a></li>
                                    <li><a href="https://aethom00.github.io/281_p4">MST & TSP Calculator</a></li>
                                    <li><a href="https://aethom00.github.io/office_hours_api">Office Hours API</a></li>
                                    <li><a href="https://aethom00.github.io/website">Personal Website</a></li>
                                    <li><a href="https://aethom00.github.io/370_p3">Pipeline Simulator</a></li>
                                    <li><a href="https://aethom00.github.io/498_p3">Quantum Fault Tolerance Library</a></li>
                                    <li><a href="https://aethom00.github.io/485_p5">Search Engine</a></li>
                                    <li><a href="https://aethom00.github.io/bst">Sorting Piazza Posts</a></li>
                                    <li><a href="https://aethom00.github.io/498_p2">Study Group Coordinator</a></li>
                                    <li><a href="https://aethom00.github.io/tumor_detection">Tumor Detection</a></li>
                                    <li><a href="https://aethom00.github.io/281_p2">Zombie Defense game</a></li>
                                    <li><a href="https://aethom00.github.io/281_p1">3-D Puzzle Solver</a></li>
                                </ul>
                                </li>
                                <li><a href="https://aethom00.github.io/maintenance">Studies & Achievements</a></li>
                                <li><a href="https://aethom00.github.io/travel.html">Travel</a></li>
                            </ul>
                            </li>
                            <!-- <li><a class="nav-link scrollto" href="mailto:aethom@umich.edu">Contact</a></li> -->
                            <li><a class="nav-link scrollto " href="Ashton_resume.pdf" target="_blank">Resume</a></li>
                            <li><a class="nav-link scrollto" href="https://aethom00.github.io/contact" target="_blank">Contact</a></li>
                        </ul>
                        <i class="bi bi-list mobile-nav-toggle"></i>
                        </nav>

                    </div>
                </header>`;

    targetElement.insertAdjacentHTML('afterend', html);    
}

header();

console.log("placed in header");

function footer() {
    const targetElement = document.getElementById('footed');;

    var html = `<footer>
                    <div class="footer-left">
                        <a href="https://www.instagram.com/ashton.thomas_/"><img src="assets/img/icons/instagram.png" alt="Instagram"></a>
                        <a href="https://www.linkedin.com/in/aethom"><img src="assets/img/icons/linkedin.png" alt="LinkedIn"></a>
                        <a href="https://www.facebook.com/ashton.thomas.125760/"><img src="assets/img/icons/facebook.png" alt="Facebook"></a>
                    </div>
                    <p>Ashton Thomas &mdash; <a href="mailto:aethom@umich.edu">aethom@umich.edu</a> &mdash; (231) - 492-8156</p>
                    <div class="footer-right">
                        <a href="https://linktr.ee/thomasash00"><img src="assets/img/icons/linktree.png" alt="LinkTree"></a>
                        <a href="https://github.com/aethom00"><img src="assets/img/icons/github.png" alt="GitHub"></a>
                        <a href="https://discordapp.com/users/greenbacon"><img src="assets/img/icons/discord.png" alt="Discord"></a>
                    </div>
                </footer>`;

    targetElement.insertAdjacentHTML('afterend', html);    
}

footer();



<template>
   <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <router-link class="navbar-brand navbar-brand-lg" to="/">
    <img class="logo" src="../assets/logo.png" alt="">
  </router-link>
     <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
        <router-link class="nav-link" to="/game"><span>Typing memo friend</span></router-link>
        </li>
      </ul>
    </div>
  </nav>
  </template>
  <style>
  /*cyan #8be9fd */
  .active{
    background:#1c1e26;
  }
  .navbar-brand-lg{
    color:#8be9fd!important;
    text-align:center !important;
  }
  
  .logo{
    min-width:10%;
    min-height:10%;
    max-width:18%;
    max-height:18%;
    float:left;
  }
  .navbar-brand{
    color:#8be9fd!important;
    text-align:center !important;
  }
  
  .nav-link{
    color:#8be9fd!important;
  }
  .nav-link:hover{
    color:#bd93f9!important;
  }
  .bg-inverse{
    /*background-color:transparent!important; */
    background-color:#282a36!important;
  }
  </style>
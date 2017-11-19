<template>
   <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <router-link class="navbar-brand" to="/">Navbar</router-link>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
        <router-link class="nav-link" to="/game">Typing memo friend</router-link>
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
  .navbar-brand{
    color:#8be9fd!important;
  }
  .nav-link{
    color:#8be9fd!important;
  }
  .nav-link:hover{
    color:#bd93f9!important;
  }
  .bg-inverse{
    background-color:#282a36!important;
  }
  </style>
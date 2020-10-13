<template>
  <div class="welcome">
    <div class="slide">
      <img src="@/assets/img/logo.svg" class="slide__logo" alt="">
      <div>
        <h1 class="slide__header">Natural Family Planning</h1>
        <p class="slide__subheader">an authentic language of a woman's health and fertility Daily tracking application</p>
      </div>
      <ul class="slide__list">
        <li class="slide__item">
          <i class="el-icon-check slide__icon"></i>
            natural, safe and inexpensive
        </li>
        <li class="slide__item">
          <i class="el-icon-check slide__icon"></i>
            96.8-99.5% effective for avoiding pregnancy
        </li>
        <li class="slide__item">
          <i class="el-icon-check slide__icon"></i>
            76-98% effective for achieving pregnancy in couples of normal fertility
        </li>
        <li class="slide__item">
          <i class="el-icon-check slide__icon"></i>
            allows a woman to monitor and maintain both her gynecological and reproductive health
        </li>
      </ul>
    </div>
    <div class="welcome__footer">
      <router-link to="/signup" class="welcome__link">
        <el-button type="default" class="welcome__button">Register</el-button>
      </router-link>
      <router-link to="/signin" class="welcome__link">
        <el-button type="primary" class="welcome__button">Login</el-button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

  .welcome {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 80px);
    &__footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      padding: 1rem;
      background-color: $light-border;
    }

    &__button {
      margin-right: 5px;
      text-transform: uppercase;
    }
  }

  .slide {
    position: fixed;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 2rem 80px;
    text-align: center;
    background-color: $main-bg;


    &__logo {
      max-width: 100px;
      margin: 0 auto
    }

    &__header {
      color: $primary-text;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    &__subheader {
      margin-top: 0;
    }

    &__list {
      padding-left: 0;
      list-style: none;
    }

    &__item {
      font-size: 0.75rem;
      font-weight: bold;
      margin-bottom: 5px;
      letter-spacing: 1px;
      color: teal;
    }

    &__icon {
      font-size: 20px;
      color: $success;
    }
  }
</style>


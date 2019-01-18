<template>
  <div class="welcome">
    <div class="slide">
      <img src="@/assets/img/logo.svg" class="slide__logo" alt="">
      <h1 class="slide__header">NFP (Natural Family Planning) helps you get pregnant or track your cycle naturally</h1>
      <ul class="slide__list">
        <li class="slide__item">
          <i class="el-icon-check slide__icon"></i>
          First feature
        </li>
        <li class="slide__item">
          <i class="el-icon-check slide__icon"></i>
          Second feature
        </li>
        <li class="slide__item">
          <i class="el-icon-check slide__icon"></i>
          Third feature
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
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/general.scss';
  .welcome {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 40px);
    &__footer {
      text-align: center;
      padding: 1rem;
      margin: 0 -20px -20px -20px;
      background-color: $light-border;
    }

    &__button {
      margin-right: 5px;
      text-transform: uppercase;
    }
  }

  .slide {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    padding: 0 2rem;
    text-align: center;
    &__logo {
      max-width: 100px;
      margin: 0 auto
    }

    &__header {
      color: $primary-text;
      font-size: 1.25rem;
      padding: 15px 0;
    }

    &__list {
      padding-left: 0;
      list-style: none;
      // text-align: left;
    }

    &__item {
      font-size: 1.15rem;
    }

    &__icon {
      color: $success;
    }
  }
</style>


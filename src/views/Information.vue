<template>
  <div class="information-page p-3">
    <h1 class="main-heading">
      Information
      <i class="el-icon-question"></i>
    </h1>
    <p class="info__section">
      1) Please note such biomarkers every day (mucus features):
    </p>
    <ol>
      <li>Consistence</li>
      <li>Color</li>
      <li>Sensation</li>
      <li>Frequency</li>
    </ol>

    <p id="characteristics" class="info__heading">Consistence</p>
    <ul>
      <li><span class="bold">6</span> - Sticky mucus stretches to 0,5 cm;</li>
      <li>
        <span class="bold">8</span> - tacky mucus stretches from 1 to 2 cm;
      </li>
      <li>
        <span class="bold">10</span> - stretchy mucus stretches by 2,5 cm or
        more
      </li>
      <li><span class="bold">G</span> – gley/gummy;</li>
      <li><span class="bold">P</span> - pasty</li>
    </ul>

    <p class="info__heading">Color</p>
    <ul>
      <li><span class="bold">K</span> - crystal clear mucus;</li>
      <li><span class="bold">C</span> - not clear white mucus;</li>
      <li>
        <span class="bold">C/K</span> - cloudy/clear mucus; partially clear,
        partially cloudy mucus;
      </li>
      <li><span class="bold">Y</span> - yellow mucus;</li>
      <li><span class="bold">B</span> - brown or black mucus</li>
    </ul>

    <p class="info__heading">Sensation</p>
    <ul>
      <li><span class="bold">0</span> – dry;</li>
      <li><span class="bold">2</span> – damp without lubrication;</li>
      <li><span class="bold">2W</span> – wet without lubrication;</li>
      <li><span class="bold">4</span> – shiny without lubrication;</li>
      <li><span class="bold">L</span> – lubricate;</li>
    </ul>

    <p class="info__heading">Frequency</p>
    <ul>
      <li><span class="bold">X1</span> - once a day</li>
      <li><span class="bold">X2</span> - twice a day</li>
      <li><span class="bold">X3</span> - 3 times per day</li>
      <li><span class="bold">AD</span> - all day</li>
    </ul>

    <p id="special-notes" class="info__section">
      2) In appropriate days please make special notes:
    </p>
    <div class="sticker-wrapper">
      <div class="sticker sticker--peak"></div>
      <p>P = peak is marked in white sticker with a baby in peak day.</p>
    </div>

    <p>
      <strong>PEAK DAY</strong> is the last day when mucus is clear and/or very
      stretchy and/or lubricative.
    </p>
    <div class="sticker-wrapper">
      <div
        class="sticker sticker--lightgreen sticker--peak sticker--peak-first"
      ></div>
      <div
        class="sticker sticker--lightgreen sticker--peak sticker--peak-second"
      ></div>
      <div
        class="sticker sticker--lightgreen sticker--peak sticker--peak-last"
      ></div>
    </div>
    <p>
      <strong>1, 2, 3</strong> is marked in 3 stickers in the next days after
      peak day
    </p>

    <div class="sticker-wrapper">
      <div class="sticker sticker--green">
        <font-awesome-icon
          icon="heart"
          color="#F56C6C"
          class="sticker--intime"
        ></font-awesome-icon>
      </div>
      <p>Intime (sex)</p>
    </div>

    <p id="-4" class="info__section">
      3) In the end of the day fill information about mucus in all field and
      choose appropriate STICKER.
    </p>

    <div class="sticker-wrapper">
      <div class="sticker sticker--red"></div>
      <p>
        <strong>RED</strong> sticker is used for the days when there is
        bleeding;
      </p>
    </div>

    <div class="sticker-wrapper">
      <div class="sticker sticker--green"></div>
      <p><strong>GREEN </strong> sticker is used in dry infertile days;</p>
    </div>

    <div class="sticker-wrapper">
      <div class="sticker sticker--lightgreen"></div>
      <p>
        <strong>LIGHT GREEN</strong> with a baby sticker is used for dry fertile
        days (within the count up to 3)
      </p>
    </div>

    <div class="sticker-wrapper">
      <div class="sticker"></div>
      <p>
        <strong>WHITE</strong> with a baby sticker is used for days when there
        is mucus;
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "information",
};
</script>

<style lang="scss">
.bold {
  font-weight: 600;
}

.main-heading {
  color: teal;
}

.info {
  &__section {
    font-weight: bold;
    font-size: 1.05rem;
  }

  &__heading {
    font-weight: bold;
  }
}

.sticker-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.sticker {
  position: relative;
  width: 40px;
  height: 70px;
  border-radius: 5px;
  background: #fff;
  margin-right: 15px;
  flex-shrink: 0;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);

  &--intime {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  &--red {
    background-color: #f56c6c;
  }

  &--green {
    background-color: #67c23a;
  }

  &--lightgreen {
    background-color: #b2e19b;
  }

  &--peak {
    position: relative;

    &::after {
      content: "P";
      position: absolute;
      right: 50%;
      top: 50%;
      transform: translate(50%, -50%);
      font-size: 2rem;
    }

    &-first {
      &::after {
        content: "1";
      }
    }

    &-second {
      &::after {
        content: "2";
      }
    }

    &-last {
      &::after {
        content: "3";
      }
    }
  }
}
</style>
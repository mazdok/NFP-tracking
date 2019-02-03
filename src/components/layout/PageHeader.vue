<template>
    <div class="page-header">
        <div class="page-header__content">
            <router-link to="/welcome">
                <el-button type="text" icon="el-icon-back" class="page-header__icon">
                </el-button>
            </router-link>
            <p class="page-header__heading">
                <slot></slot>
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/general.scss';

    .page-header {
        margin: -20px -20px 2rem -20px;
        padding: 0 20px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14), 0 2px 6px rgba(0, 0, 0, 0.15);

        &__content  {
            display: flex;
            align-items: center;
        }

        &__icon {
            color: $primary-text;
            margin-right: .5rem;
        }

        &__heading {
            font-weight: bold;
        }
    }
</style>

<template lang="html">
  <div class="tt-col-obj tt-obj-menu-categories tt-desctop-parent-menu-categories">
    <div class="tt-menu-categories">
      <!-- <router-link :to="{ name: 'categories' }">
        <button class="tt-dropdown-toggle text-center">
          CATEGORIAS
          <div style="float: right;">
            <font-awesome-icon icon="chevron-down"/>
          </div>
        </button>
      </router-link> -->
      <div class="tt-dropdown-menu">
        <nav>
          <ul>
            <li>
              <a href="catalogue.php">
                <span>BEBIDAS</span>
              </a>
              <div class="dropdown-menu size-md">
                <div class="dropdown-menu-wrapper">
                  <div class="row">
                    <div class="col-12">
                      <div class="row tt-col-list">
                        <div class="col-sm-4">
                          <a class="tt-title-submenu" href="#">
                            BEBIDAS
                          </a>
                          <ul class="tt-megamenu-submenu">
                            <li>
                              <a href="#">
                                <i class="fas fa-wine-glass"></i>
                                <span>Gaseosas</span>
                              </a>
                              <ul>
                                <li>
                                  <a href="#">
                                    <span>Coca cola</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span>
                                      Pepsi
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <span>
                                      7up
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a href="#">
                <i class="icon-women"></i>
                <span>COMIDAS</span>
              </a>
            </li>
            <li><a href="#">
              <span>LIMPIEZA</span>
            </a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>

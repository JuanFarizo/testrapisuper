<template>
  <div id="tt-pageContent">
  	<div class="container-indent">
  		<div class="container">
  			<h1 class="tt-title-subpages noborder">CREAR UNA CUENTA</h1>
  			<div class="tt-login-form">
  				<div class="row justify-content-center">
  					<div class="col-md-8 col-lg-6">
  						<div class="tt-item">
  							<h2 class="tt-title">INFORMACIÓN PERSONAL</h2>
  							<div class="form-default">
  								<form id="contactform" method="post" novalidate="novalidate">
  									<div class="form-group">
  										<label for="loginInputName">Nombre *</label>
  										<div class="tt-required">* Obligatorio</div>
  										<input type="text" name="name" class="form-control" id="loginInputName">
  									</div>
  									<div class="form-group">
  										<label for="loginLastName">Apellido *</label>
  										<input type="text" name="lastName" class="form-control" id="loginLastName">
  									</div>
  									<div class="form-group">
  										<label for="loginInputEmail">E-mail *</label>
  										<input type="text" name="email" class="form-control" id="loginInputEmail">
  									</div>
  									<div class="form-group">
  										<label for="loginInputPassword">Contraseña *</label>
  										<input type="text" name="passowrd" class="form-control" id="loginInputPassword">
  									</div>
  									<div class="row">
  										<div class="col-auto">
  											<div class="form-group">
  												<button class="btn btn-border" type="submit">CREAR CUENTA</button>
  											</div>
  										</div>
  										<div class="col-auto align-self-center">
  											<div class="form-group">
  												<ul class="additional-links">
                            <router-link :to="{ name: 'catalogue' }" tag="li">
                              <a>Volver al sitio</a>
                            </router-link>
  												</ul>
  											</div>
  										</div>
  									</div>

  								</form>
  							</div>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
}
</script>

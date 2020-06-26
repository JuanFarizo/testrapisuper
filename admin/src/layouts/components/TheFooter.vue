<template functional>
    <footer class="the-footer flex-wrap justify-between" :class="classes">
        <span>COPYRIGHT @ {{ new Date().getFullYear() }} <a href="../" target="_blank" rel="nofollow">Rapisuper</a>, Todos los derechos reservados</span>
        <span class="md:flex hidden items-center">
            <span>Administrador supermercado online</span>
        </span>
    </footer>
</template>

<script>

export default {
    name: "the-footer",
    props: {
        classes: {
            type: String,
        },
    }
}
</script>

<template>
	<div class="cell" :class="obstacleTile < 0 ? 'hover' : '' " v-on:click="clickCell">
		<div class="obstacle" :class="obstacleTile >= 0 ? 'hover-red' : '' " v-if="obstacleTile >= 0"></div>
	</div>
</template>
<script>
export default {
	name: "Cell",
	props: {
		backgroundTile: Number,
		x: Number,
		y: Number,
		obstacleTile: Number,
	},
	methods: {
		clickCell() {
			if (!this.obstacleTile) {
				const data = {x: this.x, y: this.y};
				this.$emit("cell-clicked", data);
			}
		},
	},
};
</script>

<style scoped>
.cell {
	height: 24px;
	width: 24px;
	background-image: url("../assets/TX Tileset Grass.png");
}

.cell:hover {
	cursor: pointer;
}

.cell .obstacle {
	height: inherit;
	width: inherit;
	background-image: url("../assets/case.png");
	z-index: 2;
}

.hover:hover {
	background: rgba(0,255,0,0.5);
}

.hover-red:hover {
	background: rgba(255,0,0,0.5);
}

</style>

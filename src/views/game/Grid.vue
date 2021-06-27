<template>
  <div class="game-container">
    <div class="game-row" v-for="(row, index) in cells" :key="`row-${index}`">
      <cell
        :x="cell.x"
        :y="cell.y"
        :backgroundTile="cell.backgroundTile"
        :obstacleTile="cell.obstacleTile"
        :as-player="
          listPlayerPos &&
          listPlayerPos.some((e) => e.isInPosition(cell.x, cell.y))
        "
        v-for="(cell, index) in row"
        :key="`cell-${index}`"
        v-on:cell-clicked="clicked"
      >
      </cell>
    </div>
    <div class="player-actions">
      <v-btn
        v-on:click="getCellsMove"
        :disabled="playerTurn !== user || playerTurn === ''"
        >Se déplacer</v-btn
      >
      <v-btn
        v-on:click="getCellsAttack"
        :disabled="playerTurn !== user || playerTurn === ''"
        >Attaquer</v-btn
      >
    </div>
    <div class="players-life">
      <div v-for="player in listPlayerPos" v-bind:key="player.id">
        {{ player.id }} - {{ player.lifePoints }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

import GridData from "../../models/GridData";
import Cell from "../../components/Cell.vue";

export default {
  components: { Cell },
  name: "Grid",
  data: () => ({
    //TODO : set player from db
    //TODO : make the player join
    // don't know where to put it but : this.$route.params.id to get the game id
    cells: [],
    user: "",
    playerTurn: "",
    playerMovement: "moving",
    listPlayerPos: [],
    grid: new GridData(),
  }),
  mounted() {
    this.setGame();
    this.grid.GetCellsFromJson();
    this.cells = this.grid.cells;
  },
  methods: {
    ...mapActions("game", ["get", "changeTurn"]),
    async setGame() {
      const game = await this.get(this.$route.params.id);
      console.log(game);
      this.listPlayerPos = game.listPlayerPos;
      this.playerTurn = game.playerTurn;
    },
    clicked(e) {
      if (this.playerMovement == "moving") {
        this.movePlayer(e.x, e.y);
      } else if (this.playerMovement == "attacking") {
        this.attack(e.x, e.y);
      } else {
        console.error("Action not implemented yet");
      }
    },
    movePlayer(x, y) {
      this.listPlayerPos.find((x) => x.id == this.playerTurn).setPosition(x, y);
      const cell = this.grid.cells[x][y];
      cell.asPlayer = true;
      this.changeTurn();
    },
    attack(x, y) {
      const playerAttack = this.listPlayerPos.find(
        (x) => x.id == this.playerTurn
      );
      const playerReceivingAttack = this.listPlayerPos.find(
        (player) => player.posX == x && player.posY == y
      );
      const isDead = playerReceivingAttack.getDamages(playerAttack.attack);
      if (isDead) {
        this.listPlayerPos = this.listPlayerPos.filter(
          (x) => x.id != playerReceivingAttack.id
        );
      }
      this.changeTurn();
    },
    async changeTurn() {
      this.$emit("cell-walkable", []);
      const data = await this.changeTurn(
        this.$route.params.id,
        this.playerTurn,
        0,
        0
      );
      this.playerTurn = data.playerTurn;
      /*const playerIndex = this.listPlayerPos.findIndex(
		  (x) => x.id == this.playerTurn
		);
		const playersListSize = this.listPlayerPos.length;
		if (playerIndex == playersListSize - 1) {
		  this.playerTurn = this.listPlayerPos[0].id;
		} else {
		  this.playerTurn = this.listPlayerPos[playerIndex + 1].id;
		}*/
    },
    getCellsMove() {
      const player = this.listPlayerPos.find((x) => x.id == this.playerTurn);
      const cells = this.grid.accessibleCellsAround(
        player.posX,
        player.posY,
        5,
        1,
        new Set()
      );
      this.grid.clearCellStep();
      if (cells.size > 0) {
        this.playerMovement = "moving";
        this.$emit("cell-walkable", Array.from(cells));
      }
    },
    getCellsAttack() {
      const player = this.listPlayerPos.find((x) => x.id == this.playerTurn);
      let cells = this.grid.accessibleCellsAround(
        player.posX,
        player.posY,
        2,
        1,
        new Set()
      );
      this.grid.clearCellStep();

      if (cells.size > 0) {
        console.log(player.posX + " " + player.posY);
        var filteredCells = Array.from(cells);

        // regarder avec le filter (marche pas avec arr.x != player.posX && arr.y != player.posY)
        filteredCells.forEach((item, index) => {
          if (item.x == player.posX && item.y == player.posY) {
            filteredCells.splice(index, 1);
          }
        });
        this.playerMovement = "attacking";
        this.$emit("cell-attackable", filteredCells);
      }
    },
  },
};
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}
.game-row {
  display: flex;
  flex-direction: row;
}
</style>

import { adjacentEdges, edges, corners } from "../public/DBs/dbs.mjs";

export class RubiksCube {
    constructor() {
      // Initialize the cube with solved state (each face has a single color)
      // Faces: [U, F, R, B, L, D] => [Up, Front, Right, Back, Left, Down]
      this.faces = {
        U: this.createFace('W'), // White
        F: this.createFace('G'), // Green
        R: this.createFace('R'), // Red
        B: this.createFace('B'), // Blue
        L: this.createFace('O'), // Orange
        D: this.createFace('Y')  // Yellow
      };
    }

    clone() {
      const newCube = new RubiksCube();
      
      // Deep clone the faces by copying each face array manually
      newCube.faces = {
          U: this.faces.U.map(row => [...row]),
          F: this.faces.F.map(row => [...row]),
          R: this.faces.R.map(row => [...row]),
          B: this.faces.B.map(row => [...row]),
          L: this.faces.L.map(row => [...row]),
          D: this.faces.D.map(row => [...row])
      };

      return newCube;
  }
  
    // Helper to create a face with a single color
    createFace(color) {
      return [
        [color, color, color],
        [color, color, color],
        [color, color, color]
      ];
    }
  
    // Rotate a face clockwise
    rotateFaceClockwise(face) {
      const newFace = [
        [face[2][0], face[1][0], face[0][0]],
        [face[2][1], face[1][1], face[0][1]],
        [face[2][2], face[1][2], face[0][2]]
      ];
      return newFace;
    }
  
    R() {
      this.faces.R = this.rotateFaceClockwise(this.faces.R);
  
      const temp = [this.faces.U[0][2], this.faces.U[1][2], this.faces.U[2][2]];
      this.faces.U[0][2] = this.faces.F[0][2];
      this.faces.U[1][2] = this.faces.F[1][2];
      this.faces.U[2][2] = this.faces.F[2][2];
  
      this.faces.F[0][2] = this.faces.D[0][2];
      this.faces.F[1][2] = this.faces.D[1][2];
      this.faces.F[2][2] = this.faces.D[2][2];
  
      this.faces.D[0][2] = this.faces.B[2][0];
      this.faces.D[1][2] = this.faces.B[1][0];
      this.faces.D[2][2] = this.faces.B[0][0];
  
      this.faces.B[2][0] = temp[0];
      this.faces.B[1][0] = temp[1];
      this.faces.B[0][0] = temp[2];
    }
  
    L() {
      this.faces.L = this.rotateFaceClockwise(this.faces.L);
  
      const temp = [this.faces.U[0][0], this.faces.U[1][0], this.faces.U[2][0]];
      this.faces.U[0][0] = this.faces.B[2][2];
      this.faces.U[1][0] = this.faces.B[1][2];
      this.faces.U[2][0] = this.faces.B[0][2];
  
      this.faces.B[2][2] = this.faces.D[0][0];
      this.faces.B[1][2] = this.faces.D[1][0];
      this.faces.B[0][2] = this.faces.D[2][0];
  
      this.faces.D[0][0] = this.faces.F[0][0];
      this.faces.D[1][0] = this.faces.F[1][0];
      this.faces.D[2][0] = this.faces.F[2][0];
  
      this.faces.F[0][0] = temp[0];
      this.faces.F[1][0] = temp[1];
      this.faces.F[2][0] = temp[2];
    }
  
    U() {
      this.faces.U = this.rotateFaceClockwise(this.faces.U);
  
      const temp = this.faces.F[0];
      this.faces.F[0] = this.faces.R[0];
      this.faces.R[0] = this.faces.B[0];
      this.faces.B[0] = this.faces.L[0];
      this.faces.L[0] = temp;
    }
  
    D() {
      this.faces.D = this.rotateFaceClockwise(this.faces.D);
  
      const temp = this.faces.F[2];
      this.faces.F[2] = this.faces.L[2];
      this.faces.L[2] = this.faces.B[2];
      this.faces.B[2] = this.faces.R[2];
      this.faces.R[2] = temp;
    }
  
    F() {
      this.faces.F = this.rotateFaceClockwise(this.faces.F);
  
      const temp = [this.faces.U[2][0], this.faces.U[2][1], this.faces.U[2][2]];
      this.faces.U[2][0] = this.faces.L[2][2];
      this.faces.U[2][1] = this.faces.L[1][2];
      this.faces.U[2][2] = this.faces.L[0][2];
  
      this.faces.L[0][2] = this.faces.D[0][0];
      this.faces.L[1][2] = this.faces.D[0][1];
      this.faces.L[2][2] = this.faces.D[0][2];
  
      this.faces.D[0][0] = this.faces.R[2][0];
      this.faces.D[0][1] = this.faces.R[1][0];
      this.faces.D[0][2] = this.faces.R[0][0];
  
      this.faces.R[0][0] = temp[0];
      this.faces.R[1][0] = temp[1];
      this.faces.R[2][0] = temp[2];
    }
  
    B() {
      this.faces.B = this.rotateFaceClockwise(this.faces.B);
  
      const temp = [this.faces.U[0][0], this.faces.U[0][1], this.faces.U[0][2]];
      this.faces.U[0][0] = this.faces.R[0][2];
      this.faces.U[0][1] = this.faces.R[1][2];
      this.faces.U[0][2] = this.faces.R[2][2];
  
      this.faces.R[0][2] = this.faces.D[2][2];
      this.faces.R[1][2] = this.faces.D[2][1];
      this.faces.R[2][2] = this.faces.D[2][0];
  
      this.faces.D[2][0] = this.faces.L[0][0];
      this.faces.D[2][1] = this.faces.L[1][0];
      this.faces.D[2][2] = this.faces.L[2][0];
  
      this.faces.L[0][0] = temp[2];
      this.faces.L[1][0] = temp[1];
      this.faces.L[2][0] = temp[0];
    }

    makeMove(move) {
      let times = 1;
      if (move.length > 1) {
        if (move[1] === '2') times = 2;
        else if (move[1] === '\'') times = 3;
        move = move[0];
      }
      for (let i = 0; i < times; i++) {
        switch(move) {
          case 'U':
            this.U();
            break;
          case 'R':
            this.R();
            break;
          case 'D':
            this.D();
            break;
          case 'L':
            this.L();
            break;  
          case 'F':
            this.F();
            break;
          case 'B':
            this.B();
            break;
          default:
            console.log(`The wrong char is ${move}`);
            break;
        }
      }
    }

    makeAlg(alg) {
      if (alg === '') return;
      alg = alg.trim();
      const moves = alg.split(' ');
      if (moves[0] === '') return;
      moves.forEach(move => {
        this.makeMove(move)
      });
    }

    edgeOtherColor(face, [row, col]) {
        const key = `${row},${col}`;
        if (adjacentEdges[face] && adjacentEdges[face][key]) {
          const adjacentFace = adjacentEdges[face][key].face;
          const adjacentPosition = adjacentEdges[face][key].position;
          const [adjRow, adjCol] = adjacentPosition;
    
          return this.faces[adjacentFace][adjRow][adjCol];
        }
    
        return null;
      }

    printCube() {
        console.log('U:', this.faces.U);
        console.log('F:', this.faces.F);
        console.log('R:', this.faces.R);
        console.log('B:', this.faces.B);
        console.log('L:', this.faces.L);
        console.log('D:', this.faces.D);
    }

    findEdge(color1, color2) {
      // Loop through each edge and check if the two colors match
      for (let edge of edges) {
          const facelet1 = this.faces[edge.face1][edge.pos1[0]][edge.pos1[1]];
          const facelet2 = this.faces[edge.face2][edge.pos2[0]][edge.pos2[1]];
  
          if ((facelet1 === color1 && facelet2 === color2) || (facelet1 === color2 && facelet2 === color1)) {
              return { face: edge.face1, position: edge.pos1 };  // Return one of the facelets of the edge
          }
      }
      return null;  // If no edge is found
    }

    findYellowCorner(color1, color2, color3) {
      // Loop through each corner and check if the three colors match
      for (let corner of corners) {
        const facelet1 = this.faces[corner.face1][corner.pos1[0]][corner.pos1[1]];
        const facelet2 = this.faces[corner.face2][corner.pos2[0]][corner.pos2[1]];
        const facelet3 = this.faces[corner.face3][corner.pos3[0]][corner.pos3[1]];

        const faceletColors = [facelet1, facelet2, facelet3];
        const inputColors = [color1, color2, color3];

        // Check if the facelet colors match the input colors (in any order)
        if (inputColors.every(color => faceletColors.includes(color))) {
            // Prioritize returning the facelet with the yellow color ('Y') if present
            if (facelet1 === 'Y') return { face: corner.face1, position: corner.pos1 };
            if (facelet2 === 'Y') return { face: corner.face2, position: corner.pos2 };
            if (facelet3 === 'Y') return { face: corner.face3, position: corner.pos3 };

            // If no yellow facelet, return any facelet (default to face1)
            return { face: corner.face1, position: corner.pos1 };
        }
      }

      return null;  // If no corner is found
    }
    findNonYellowCorner(color1, color2, color3) {
      // Loop through each corner and check if the three colors match
      for (let corner of corners) {
        const facelet1 = this.faces[corner.face1][corner.pos1[0]][corner.pos1[1]];
        const facelet2 = this.faces[corner.face2][corner.pos2[0]][corner.pos2[1]];
        const facelet3 = this.faces[corner.face3][corner.pos3[0]][corner.pos3[1]];

        const faceletColors = [facelet1, facelet2, facelet3];
        const inputColors = [color1, color2, color3];

        // Check if the facelet colors match the input colors (in any order)
        if (inputColors.every(color => faceletColors.includes(color))) {
            // Prioritize returning the facelet with the yellow color ('Y') if present
            if (facelet1 !== 'Y') return { face: corner.face1, position: corner.pos1 };
            if (facelet2 !== 'Y') return { face: corner.face2, position: corner.pos2 };
            if (facelet3 !== 'Y') return { face: corner.face3, position: corner.pos3 };

            // If no yellow facelet, return any facelet (default to face1)
            return { face: corner.face1, position: corner.pos1 };
        }
      }

      return null;  // If no corner is found
    }
}
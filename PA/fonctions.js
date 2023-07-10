function tableToGraphe(table){
  nodes=[]
  edges=[]
  size=table.length;
  for(var i=0;i<size;i++){

    nodes.push({id: i,label:" "+i+" ", color:"#203940"})

  }
  for(var i=0;i<size;i++){
    for(var j=i;j<size;j++){
      if(table[i][j]!=0)
        edges.push({from:i,to:j})
    }
  }
  nodes=new vis.DataSet(nodes);
  edges=new vis.DataSet(edges);
  return {nodes:nodes, edges:edges}
}

function randomGraph(size){
  //Initialiser le tableau
  var table= new Array(size)
  for(var i=0;i<size;i++){
    table[i]= new Array(size)
  }
  //Remplir le tableau aléatoirement
  for(var i=0;i<size;i++){
    for(var j=i;j<size;j++){
      table[i][j]=Math.random()>0.8?1:0;
      table[j][i]=table[i][j]
    }
  }
  return table
}


//Parcours de graphe DFS
function DFS(sommet,nbComp,table){
  if(!marque){
    marque=new Array(table)
    for(var i=0;i<marque.length;i++){
      marque[i]= false;
    }
  }

  marque[sommet]=nbComp+1;
  //console.log(sommet);
  for(var i=0;i<table.length;i++){
    if(table[sommet][i]!=0 && !marque[i]){
      DFS(i,nbComp,table);
    }

  }
}

//Fonction qui calcule le nombre de composantes connexes
function nbComposanteConnexes(table){
  nbCompNouveau=0
  marque=new Array(table)
  for(var i=0;i<marque.length;i++){
    marque[i]= false;
  }
  for(var i=0;i<table.length;i++){
    if(!marque[i]){
      DFS(i,nbCompNouveau,table)
      nbCompNouveau++;
    }
  }
  return nbCompNouveau;
}

function trouverPointsArticul(table){
  nbCompGraphe=nbComposanteConnexes(table);
  var Articul=[]
  for(var s=0;s<table.length;s++){
    var save=new Array(table.length)
    save=table.map(function(arr) {
        return arr.slice();
    });

    for(var i=0;i<save.length;i++){
      table[s][i]=0;
      table[i][s]=0;
    }
    var nbCompNouveau= nbComposanteConnexes(table)
    for(var i=0;i<save.length;i++){
      for(var j=0;j<save.length;j++){
      table[i][j]=save[i][j];
      }
    }
    delete save;
    //Si le nombre de composantes connexes a augmenté (s point d'articulation)
    if(nbCompNouveau>nbCompGraphe+1){
      Articul.push(s)
      console.log("Artic : ",nbCompGraphe," Nouv : ",nbCompNouveau)
    }

  }
  return Articul
}

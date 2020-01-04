
//  like search
db.getCollection('metadatas').find({"property":"allcities", "values" : /.*lombo.*/})


db.runCommand({
          distinct : "metacities",
          key : "name",
          query : {"name" : /.*co.*/i}
})

db.getCollection('metacities').distinct("name" ,   {"name" : /.*Co.*/i})



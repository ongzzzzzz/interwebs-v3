let links = [
    {
        name:"g",
        title:"Github",
        description:"Some repos I have",
        public:true,
        url:"https://github.com/Fogeinator"
    },
    {
        name:"i",
        title:"Instagram",
        description:"Pics of life!!",
        public:true,
        url:"https://www.instagram.com/ong.zhi.zheng"
    },
    {
        name:"klesf2020",
        title:"O-Helmet",
        description:"Like and Share!",
        public:true,
        url:"https://www.youtube.com/watch?v=btMc1QL38iM&feature=youtu.be"
    },
    {
        name:"cecamp",
        title:"osman",
        description:"?",
        public:false,
        url:"https://perspective.fogeinator.repl.co"
    },
    {
        name:"zom",
        title:"Zoom Link",
        description:"侦的吗？",
        public:false,
        url:"https://hack.af/z-join?id=u44ure"
    }
];

export default (req, res) => {
  res.status(200).json(links)
}

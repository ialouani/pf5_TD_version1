function cons(v1,v2){
    return {vv1:v1, vv2:v2};}
function value1(l){
    return l["vv1"];}
function value2(l){
    return l["vv2"];}
const nil={};
function head(l){
    return value1(l);}
function tail(l){
    return value2(l);}
function iE(l){
    return l===nil;}
//la difference levant le doute sur une eventuelle redondance
//est que head,tail operent sur une liste
//mais value1 et value2 sur des paires pointées.
//DEBUT EXERCICE1:>>
let l3=cons(3,nil);
let l2=cons(2,l3);
let l1=cons(1,l2);
//console.log(l1);
//console.log("************************EXO1:>>>");
function myFilter(l,val){
    if(iE(l)) return nil;
    else{
	return (head(l)>val && cons(head(l),myFilter(tail(l),val))) || myFilter(tail(l),val);}}
let lp=cons(4,l1);
let ll=cons(90,lp);
let lll=cons(5,ll);
function list_to_array(l){
    if(l===nil) return [];
    else return [head(l)].concat(list_to_array(tail(l)));}
console.log("exo1:");
console.log("qst(1):");
console.log(list_to_array(lll),list_to_array(myFilter(lll,2)));//3,5,4,90.
console.log("*********************");
console.log("qst(2):");
function myFilterGen(l,f_an1){
    if(iE(l)) return nil;
    else{
	return (f_an1(head(l)) && cons(head(l),myFilterGen(tail(l),f_an1))) || myFilterGen(tail(l),f_an1);}}
function f_an1(v){
    return function f_an11(x){
	return x>v;};}
//application pour tester comme avant.
let f_an11=f_an1(2);
console.log(list_to_array(lll),list_to_array(myFilterGen(lll,f_an11)));
console.log("*************************");
console.log("qst(3):");
/*let a="A";let b="Z";
console.log(a.charCodeAt(),b.charCodeAt());*/
//entre 65 et 90 pour le code ASCII des lettres MAJUSCULES.//
function myFilterAlpha(l){
    return myFilterGen(l,(e)=>{return e[0].charCodeAt(e[0]) >=65 && e[0].charCodeAt(e[0]) <=90;});}
let strp="afstr";let strp2="fje";let strp3="Afgetd";let strp4="Rhfdfy";
let strp5="fejf";//console.log(strp3[0].charCodeAt());
let list1=cons(strp,cons(strp2,cons(strp3,cons(strp4,cons(strp5,nil)))));
console.log(list_to_array(myFilterAlpha(list1)));
console.log("****************************************");
console.log("*************DEBUT EXO2:>>");
console.log("qst(1):");
function differentiate(f,h){
    return (x)=>(f(x+h)-f(x-h))/(2*h);}
function derivee(f,h){
    let derivation_rs=function(x){return (f(x+h)-f(x-h))/(2*h);};
    return derivation_rs;}
let curried_form_derivation=(f)=>(x)=>(h)=>(f(x+h)-f(x-h))/(2*h);
let fg=(x)=>3*x;
console.log(differentiate(fg,0.0001)(5));
console.log(derivee(fg,0.0001)(5));
console.log(curried_form_derivation(fg)(5)(0.0001));
console.log("****************************");
console.log("qst(2):");
//special-1-: f,h=0.1 renvoie f'(x) pour tout x.
let special1=(f)=>differentiate(f,h=0.1);//specialisation de differentiate.
let gh=(x)=>3*Math.pow(x,2);
console.log(special1(gh)(1));
console.log(special1(gh)(3));
let special2=(h)=>differentiate(f=Math.cos,h);//specialisation autrement.
console.log(special2(0.1)(3.14/4),-Math.sin(3.14/4));
console.log(special2(0.000001)(3.14/4),-Math.sin(3.14/4));
console.log("************************");
console.log("qst(3):");
function diffN(f,n,h){
    if(n===1) return differentiate(f,h);
    else{
	return differentiate(diffN(f,n-1,h),h);}}
let gjp=(x)=>2*Math.pow(x,3);//2x**3 puis 6x**2 puis 12x puis 12 puis 0.
let z=2;
//let deriv_end=diffN(gjp,4,0.0001);
//console.log(deriv_end(2));
console.log(diffN(gjp,1,0.0001)(z),diffN(gjp,2,0.0001)(z),diffN(gjp,3,0.0001)(z),diffN(gjp,4,0.001)(z));//resultats retournés juste.
function loop(f,vv,n){//f prend 2 parametres : valeur courant$1+h$2.///
    if(n===1) return vv;
    else return loop(f,f(vv,h),n-1);}//applique f(vv) puis f(f(vv)) ..
function deriv_N(f,n,h){
    return loop(differentiate,differentiate(f,h),n);}//pour les n>=1.
console.log(deriv_N(gjp,1,0.0001)(z),deriv_N(gjp,2,0.0001)(z),deriv_N(gjp,3,0.0001)(z),deriv_N(gjp,4,0.001)(z));//marche avec remarque deja faite sur 
//la feuille de td en rapport avec h un peu grand pour que f(4)(gjp,h=0.001)
//soit correcte et admissible.
let deriv_on=(f)=>(n)=>(h)=>loop(differentiate,differentiate(f,h),n);
console.log(deriv_on(gjp)(1)(0.0001)(z));
console.log(deriv_on(gjp)(2)(0.0001)(z));
console.log(deriv_on(gjp)(3)(0.0001)(z));
console.log(deriv_on(gjp)(4)(0.0001)(z));//application + test du curryfing.//
console.log("***********************");
console.log("qst(4):");
function derivee_seconde(f,h){
    return function(x){
	return (f(x+h)-2*f(x)+f(x-h))/(Math.pow(h,2));};}
function derivee_troisieme(f,h){
    return function(x){
	return (-f(x-2*h)+2*f(x-h)-2*f(x+h)+f(x+2*h))/(2*Math.pow(h,3));};}
let d2=derivee_seconde(gjp,0.0001);
let d3=derivee_troisieme(gjp,0.0001);
console.log(d2(z),d3(z));//pour d3(z) on avait l'habitude
//de se retrouver avec..
let func=(x)=>2*Math.pow(x,5);//2*x**5=>10*x**4=>40*x**3=>120*x**2=>240*x
let d4_f=derivee_troisieme(func,0.0001);
let d4_v__a=deriv_N(func,3,0.0001);
console.log(d4_f(10));console.log(d4_v__a(10));
//bizarre de trouver d4_f donnant resultat mieux que d4_f__a.
//reprise de la question 4:>>
console.log("adaptation strategie de la QST4:>>");
console.log("******************");
console.log("*********************");
function d_1(f,h){//derivee premiere
    return function(x){
	return (f(x+h)-f(x-h))/(2*h);};}
function d_N(f,h,n){//derivee n-ieme..
    if(n===1) return d_1(f,h);
    else return d_N(d_1(f,h),h,n-1);}
function d_2(f,h){
    return function(x){
	return (f(x+h)+f(x-h)-2*f(x))/(Math.pow(h,2));};}
function d_3(f,h){
    return function(x){
	return ((f(x+2*h)-f(x-2*h))+(2*f(x-h)-2*f(x+h)))/(2*Math.pow(h,3));};}
function trig1(x){
    return Math.cos(x);}
let pi=Math.PI;
//console.log(trig1(2*pi),Math.round(trig1(pi/2)));//exemples..
//console.log("2>:::");
//let ssin=d_1(trig1,0.001);
//console.log(ssin(pi),Math.round(ssin(pi/2)));(0;;;;;;;;;-1)
//comparaison de la version d_2/3 avec d_N / $(n)===2/3.///
//derivee premiere rien a faire ici EN comparaison.
//fonctions concernees: d_N et (||||||||||||||d_2 & d_3.)
let f_seconde=d_N(trig1,0.001,2);
let f_seconde_v2=d_2(trig1,0.001);
let f_3=d_N(trig1,0.001,3);
let f_3_v2=d_3(trig1,0.001);
console.log("comparaison des 2 derivees secondes approcimatives:::");
console.log(f_seconde(pi/4),f_seconde_v2(pi/4),-Math.sqrt(2)/2);
//on retrouve que la v_2 de d_2 donne un resultat plus pres de
//la 3ieme valeur connue donc mieux.///
console.log("comparaison des 2 derivees troisiemes approcimatives:::");
console.log(f_3(pi/4),f_3_v2(pi/4),Math.sqrt(2)/2);
//les 2 pas proches mais en d_3(cos,h=0.001,3) cest un peu plus proche
//car tres grande(());;; par rapport a lautre.////((()));/////////
console.log("conclusion commune des deux: la 2ieme version avec hcst mieux.//");
console.log("*************suite: EXO3::");
console.log("*(qst1)**");
//algo de ~sqrt iterativement:>>
function an(n,x){//calcul de an;
    if(n===0) return 1;//a0=1.///
    else return 1/2 * (an(n-1,x) + x/an(n-1,x));}
function proches(x1,x2,epsil){
    return Math.abs(x1-x2)<=epsil;}
function ssqrt(x,eps){
    let n=1;let y=an(n,x);let z=an(n+1,x);n=2;//y=a1;z=a2;;
    while(!proches(y,z,eps)){
	n++;
	y=z;
	z=an(n,x);}
    return z;}
console.log(ssqrt(2,0.0001),Math.sqrt(2));
console.log(ssqrt(49,0.0001),Math.sqrt(49));
console.log("2ieme methode de la 1ere version primitive ITERATIVEE");
let start=1;
//let current=start;
function getNext(n,x){
    let current=start;
    for(let i=0;i<n;i++){
	current=1/2 * (current + x/current);}
    return current;}
function hasReached(x,y,eps){
    return Math.abs(y-x)<=eps;}
function sqrtt(x,eps){
    let y=1;let z=getNext(1,x);let n=1;
    while(!hasReached(y,z,eps)){
	n++;
	y=z;
	z=getNext(n,x);}
    return z;}
console.log(sqrtt(43,0.0001),Math.sqrt(43));
console.log("*****debut de la question(1)::::::");
/////let strt=1;
function getNextSquare(ec,x){//n~++current
//n>=1
     return 1/2 * (ec + x/ec);}
function hasReachedSquare(y,z,eps){//z=x tjrs.////////
    return Math.abs(y-Math.sqrt(z))<=eps;}
function getNextCubic(ec,x){
return 1/3 * (2*ec + x/Math.pow(ec,2));}
function hasReachedCubic(y,z,eps){
    return Math.abs(y-Math.cbrt(z))<=eps;}
function fixedPoint(x,startt,eps,hasReached,getNext){
    if(hasReached(startt,x,eps)) return startt;
    else return fixedPoint(x,getNext(startt,x),eps,hasReached,getNext);}
let fpm1=hasReachedSquare;
let fpm2=getNextSquare;
let fixedPoint_2=function(x,startt=1,h){
    return fixedPoint(x,startt,h,fpm1,fpm2);};
//~sqrt(x) avec une erreur de h.///
let square=function(x){return fixedPoint_2(x,1,0.0001);};
console.log("qst(2&3&&((4)))");
console.log(square(564),Math.sqrt(564));
console.log(square(56490),Math.sqrt(56490));
console.log(square(564899),Math.sqrt(564899));
console.log("tests relatifs a la racine cubique:>>");
let cbrtt=function(x,startt=1,h=0.0001){
    return fixedPoint(x,startt,h,hasReachedCubic,getNextCubic);};
let cbrtt234=(x)=>cbrtt(x,1,0.0001);
console.log(cbrtt234(563),Math.cbrt(563));
console.log(cbrtt234(5635632),Math.cbrt(5635632));
console.log("****************************************************");
//profit de la genericite de la fonction polymorphe fixedPoint:>>
let fpmmm=(y,z,eps)=>Math.abs(z-y)<=eps;
function fixedPoint2(x,startt,eps,hasReached,getNext){
    //console.log("passage");
    if(hasReached(getNext(startt,x),startt,eps)) return startt;//..///
    else{//startt=getNext(startt,x);console.log("passage++");
	return fixedPoint2(x,getNext(startt,x),eps,hasReached,getNext);}}
function fP(x,s,e,fh){return fixedPoint2(x,s,e,fpmmm,fh);}
let square_vv2=(x)=>fP(x,1,0.1,getNextSquare);
//fP est une specialisation de fixedPoint2 en $4===hasReached
//puisque fP en est une et UTILE (voir plus bas++) donc
//fixedPoint2 est une generalisation
//de meme pour fixedPoint (voir plus bas+).////
console.log(square_vv2(673),Math.sqrt(673));
function square_v2(x){return fixedPoint(x,1,0.1,hasReachedSquare,getNextSquare);}
console.log(square_v2(7867),Math.sqrt(7867));
//square_v2 est une specialisation de fixedPoint en $i avec i>=1
//donc dapres la propriete COMPLETUDE des genericites et specialisations
//on aura le FAIT QUE fixedPoint est un polymorphisme
//donc suit le cours de LA generalisation polymorphe.//
//cest en cela ou se cache la generalisation assuree par notre 
//implementation recursive de fixedPoint et aussi DE fixedPoint2./////
//conclusion:
/*exo3: qst1->>
gNSQ calcule avec x le prochain depuis $1===current
hRSQ teste la possibilite darret via -eps<=$1-rsltt($2 cst x)<=eps
de meme pour gNCU && hRCU.
qst2 faite++.//////
qst3->>
    fixedPoint calcule le point fixe de la suite
 soit la racine de la fonction caracteristique par la methode 
de NEWTON-RAPHSON 
  soit  la racine/racine__cubique du nombre $1==x=>
prototype fP(x,start=1(()),$3:h~~~²²0.1/0.1*10**((-3)),$4:fg,$5:fh)
avec h lerreur utilisee par FG et fh calculateur du suivant
rq: fg hRSQ/CU(~start~~current,x,h) et fh gNSQ/CU(start~~~;;current,x);;;;;
fonction generalisee via ordre superieur par parametre OPTIONNEL fonctionnel.
resume du td6:
1-filtres((sur les listes)) en g/s.
2-derivees de fonctions (1ere classe ecma) en g/s.
3-points fixes de newton en generalisation et application pour fixer f et x
soit la suite avec un $2:::start() et chercher f(x) soit g(y)=0
avec g(y)=y-f(x) => a cherche BIEN SUR y soit racine de f
par RETOUR SUR LA METHODE DE newton-raphson<=>point fixe de suite 
regle en ++ par un epsilon d'appromixation de JUSTESSE[].
resume rapide DU cours::::
fonctions sont 1ere classe => argument && retour + pf(++) via 
ce quelles offrent.
==>>>
1--argument:     ordre superieur 
 =>loop,countChars,sortThree,factorisation,strategie
 =>=>caracteristiques de celles ci : genericite& POLYMORPHISME.
 (<$#[[1]] ajout parametre fonctionnel appui ok sur test~retour fonctionnel
booleen, |||>>>types importent peu de quelques arguments, polymorphisme via la genericite par ecriture globale de la fonction par typage variée(<T>).
2--retour:{{{facilitation via specialisation}}} 
**specialisation par fixation d'un argument => le prendre PAR defaut.
*****>>methodes sur les objets:
1-apartt: curryfication ()()..n fois avec n=card($#) && '#'===f.arguments()..///
2-
2-1-methode fondamentale du pluck:
 function pluck(field)===(obj)=>obj[field];(<=>specialisation 
vu PAR RETOUR de recuperation de la valeur de la cle field sur LOBJET
~generalisation de la recherche d'un field__value par ouverture
du champ de field en ARGUMENTT.)
2-2-methode du compareWith:
destine au sort des arrays[[[]]] par generalisation de la fonction comparaison
de v1(obj1),v1(obj2) && >>>v1 en argument retourne fonction de comparaison par specialisation en FILED..///
3-4---decorateur fonctionnel (wrap de lodash)
exemple::((())):::
var hello=function(name){return name;};
hello=require("~/.nvm/versions/node/v11.15.0(!()!!)/lib/node_modules/undescore").wrap(hello,function(f,name){
return 'hello   ' + f(name);};
PUISSS hello("rtfre") comme test SI CA retournera hello  rtfre  ;//
*/
var hello=function(name){return name;};
let _=require("underscore");
hello=_.wrap(hello,function(f,name){
    return "hello" + f(name);});
console.log(hello("rfdte"));
//permet d'ajouter un plus en parametre fonction3 
//par rapport a LORIGINEEE.//
//FIN DU TD6.////

 


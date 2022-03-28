Pràctica 1 Simulació Física 21-22

Clara Valls
Ariel Andreas Daniele

Hem optat per desenvolupar el billar americà amb colisions bàsiques. 
Cal esmentar que hem implementat les colisions realistes de forma bastant exitosa, pero degut a un cas excepcional en el que no funcionava del tot bé i que amb les colisions basiques aquestes eren més estables hem decidit deixar-les així.

L'inicialització automàtica es fa a partir del preload de dos jsons; un orientat al joc i els seus components i l'altre orientat als dos jugadors.

L'arxiu billar.js conté la lógica principal (és on es fa el setup i el draw), i els arxius balls.js, hole.js, controller.js i player.js contenen la resta de codi necesari per fer funcional el billar.

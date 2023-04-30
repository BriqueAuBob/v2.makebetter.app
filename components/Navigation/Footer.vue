<template>
	<footer
		class="shadow-top2xl bg-footer bg-cover bg-center bg-no-repeat py-24 text-white shadow-primary-500"
	>
		<div class="container grid gap-16 lg:grid-cols-5">
			<div class="col-span-2">
				<h1 class="text-2xl font-bold">MakeBetter</h1>
				<p class="mb-1 mt-4">
					Améliore tout tes projets avec nos outils !
				</p>
				<i class="text-sm font-semibold text-gray-400">
					Nous ne sommes pas affiliés avec les services pour lesquels
					nous proposons des outils.
				</i>
				<div class="mt-8 flex gap-4">
					<a href="https://twitter.com/GUMaestro" target="_blank">
						<NuxtIcon name="socials/twitter" class="icon big" />
					</a>
					<a
						href="https://discord.com/invite/GWpGBK8gmA"
						target="_blank"
					>
						<NuxtIcon name="socials/discord" class="icon big" />
					</a>
					<a
						href="https://youtube.com/channel/UC9Z6Y5zXx7BUVrZ9YXxZQ8w"
						target="_blank"
					>
						<NuxtIcon name="socials/youtube" class="icon big" />
					</a>
				</div>
			</div>
			<div>
				<h1 class="text-xl font-bold">Liens utiles</h1>
				<ul class="mt-4 flex flex-col gap-2 text-sm font-medium">
					<li>
						<a href="#">Accueil</a>
					</li>
					<li>
						<a href="#">Créateur d'embeds</a>
					</li>
					<li>
						<a href="#">Nos tutoriels</a>
					</li>
					<li>
						<a href="#">Avis des utilisateurs</a>
					</li>
				</ul>
			</div>
			<div>
				<h1 class="text-xl font-bold">Groupe</h1>
				<ul class="mt-4 flex flex-col gap-2 text-sm font-medium">
					<li>
						<a href="#">Site</a>
					</li>
					<li>
						<a href="#">Recrutements</a>
					</li>
					<li>
						<a href="#">Partenaires</a>
					</li>
				</ul>
			</div>
			<div>
				<h1 class="text-xl font-bold">Confidentialité & Sécurité</h1>
				<ul class="mt-4 flex flex-col gap-2 text-sm font-medium">
					<li>
						<a href="#">Conditions générales d'utilisation</a>
					</li>
					<li>
						<a href="#">Politique de confidentialité</a>
					</li>
				</ul>
			</div>
		</div>
	</footer>
</template>

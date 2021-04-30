function get_params() {
	var name = document.getElementById('name').value
	var search = (document.getElementById('search').value).replaceAll(' ','_')
	let check = true
	if (name==""){
		check = false
	}
	var proxy = "https://cors-anywhere.herokuapp.com/";
	var url = `${proxy}https://pt.wikipedia.org/wiki/${search}`
	
	
	fetch(url).then(response => response.text())
				.then(result => scrap(result, "text/html"))
			.catch(error => erro())


	function erro() {
		if (check == true){
			let text_name = document.getElementById("text_name")
			text_name.innerHTML = `Ops ${name}, aconteceu um erro`
		}
		document.querySelector("body > div.col.d-flex.justify-content-center > div > div > p").innerHTML = "Houve um erro em sua busca. Digite novamente"

		document.querySelector("body > div.col.d-flex.justify-content-center > div > img").setAttribute('src',"https://blog.tiny.com.br/wp-content/uploads/2018/01/erro-nota-fiscal-1024x700.jpg")

		document.querySelector("body > div.col.d-flex.justify-content-center > div > div > h5").innerHTML = 'ERRO'
			
	}
			
	function scrap(html, content_type) {
		let parser = new DOMParser()
		let doc = parser.parseFromString(html, content_type)

		let url_img = `https://${doc.querySelector("#mw-content-text > div.mw-parser-output > table.infobox_v2 > tbody > tr:nth-child(2) > td").getElementsByTagName('a')[0].getElementsByTagName('img')[0].getAttribute("src").replace('//','')}`

		let title = doc.getElementById('firstHeading').innerText

		let paragraph = doc.getElementsByTagName('p')[0].innerText
		
		if (check == true){
			let text_name = document.getElementById("text_name")
			text_name.innerHTML = `${name}, aqui está sua busca.`
		}
		document.querySelector("body > div.col.d-flex.justify-content-center > div > div > p").innerHTML = paragraph

		document.querySelector("body > div.col.d-flex.justify-content-center > div > img").setAttribute('src',url_img)

		document.querySelector("body > div.col.d-flex.justify-content-center > div > div > h5").innerHTML = title
	
	}

}
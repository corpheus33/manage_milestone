//FIXME : timelinebootstrap : https://bootsnipp.com/snippets/a3BjR
// 30 days react : https://www.fullstackreact.com/30-days-of-react/day-10/

//JDD
// date au format MM/DD/YYYY
var dataExample = [
    {
        id: 1,
        date: '09/06/2018',
        content: 'contenu 1',
        actif: true
    },
		{
        id: 4,
        date: '11/18/2018',
        content: 'contenu 4',
        actif: false
    },
		{
        id: 3,
        date: '10/30/2018',
        content: 'contenu 3',
        actif: false
    },
		{
        id: 2,
        date: '10/15/2018',
        content: 'contenu 2',
        actif: true
    },
		{
        id: 5,
        date: '12/12/2018',
        content: 'contenu 5',
        actif: true
    },
];


function idGenerator() {
  var length = 8;
  var timestamp = +new Date;

  var _getRandomInt = function( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }

  var ts = timestamp.toString();
  var parts = ts.split( "" ).reverse();
  var id = "";

  for( var i = 0; i < length; ++i ) {
    var index = _getRandomInt( 0, parts.length - 1 );
    id += parts[index];
  }

  return id;
}

//composant graphique Modal pour afficher le formulaire d'ajout d'items
class NewCardModalComponent extends React.Component {
	constructor(props) {
		super(props);
  	this.state = {
			showModal: false,
			cardDate: null,
			cardDescription: null,
		};

    //binding des fonctions pour permettre à "this" de fonctionner.
		this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
		//this.handleDateChange = this.handleDateChange.bind(this);
		//this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// handleDateChange(event) {
	// 	this.setState({cardDate: event.target.value});
	// }
  //
	// handleDescriptionChange(event) {
	// 	this.setState({cardDescription: event.target.value});
	// }

  //mapping automatique des champs du formulaire avec les champs du state
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]:value
      }
    );
  }

	handleSubmit(event) {
		//this.setState({dateValue: event.target.value});
		//alert('Jalon : ' + this.state.descriptionValue + ' à réaliser pour le '+ this.state.dateValue + ' event.target.value '+ event.target.value);
    //FIXME : contrôle champs not null contrôle du champ cardDate au format MM/DD/YYYY (ou prévoir une transformation)
    this.props.addNewItem(this.state);
    event.preventDefault();
	}

	handleShow() {
    this.setState({showModal: true});
  }

  handleHide() {
    this.setState({showModal: false});
  }

	render() {

		const modal = this.state.showModal ? (
			<div id="newCardComponent" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="newCardComponentLabel">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="newCardComponentLabel">Ajouter un jalon</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label htmlFor="cardDate">Date :</label>
								<input type="date" className="form-control" name="cardDate" onChange={this.handleInputChange}/>
							</div>
							<div className="form-group">
								<label htmlFor="cardDescription">Description :</label>
								<textarea className="form-control" rows="5" name="cardDescription" onChange={this.handleInputChange}/>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
							<button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Sauvegarder</button>
						</div>
					</div>
				</div>
			</div>
		) : null;

		return (
			<div id="modalB">
			<button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#newCardComponent" id="modal" onClick={this.handleShow}>
		    Jalon +
		  </button>
			{modal}
			</div>
        );
    }
}

//composant graphique Modal pour afficher le formulaire de modification d'une carte
//FIXME : https://codeburst.io/how-to-use-react-lifecycle-methods-ddc79699b34e
class UpdateItemComponent extends React.Component {
	constructor(props) {
		super(props);
  	this.state = {
			showModal: false,
      NewCardDate: this.props.item.date,
      newCardDescription: this.props.item.content,
      actif: this.props.item.actif,
		};

		this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  //mapping automatique des champs du formulaire avec les champs du state
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]:value
      }
    );
  }

	handleSubmit(event) {
		//this.setState({dateValue: event.target.value});
		//alert('Jalon : ' + this.state.descriptionValue + ' à réaliser pour le '+ this.state.dateValue + ' event.target.value '+ event.target.value);
    //FIXME : contrôle champs not null contrôle du champ cardDate au format MM/DD/YYYY (ou prévoir une transformation)
    //this.props.addNewItem(this.state);
    var tmp = {
      id: this.props.item.id,
      date: new Date(this.state.newCardDate),
      content: this.state.newCardDescription,
      actif: true,
    };
    //console.log("UpdateItemComponent.submit item id "+this.props.item.id+" / contenu "+this.state.newCardDescription+" date "+this.state.newCardDate+" e.target "+event.target.value);
    console.log("UpdateItemComponent.submit item id "+tmp.id+" / contenu "+tmp.date+" date "+tmp.content+" actif "+tmp.value);
    this.props.updateItem(tmp);
    //console.log("submit item id "+this.props.item.id+" / contenu "+this.state.newCardDescription+" date "+this.state.newCardDate+" e.target "+event.target.value);
    event.preventDefault();
	}

  //Afficher la modal
	handleShow() {
    console.log("show item id "+this.props.item.id+" / contenu "+this.props.item.content+" date "+this.props.item.date.toLocaleDateString('fr-FR'));
    this.setState({showModal: true});
  }
  //masquer la modal
  handleHide() {
    this.setState(
      {
        showModal: false,
        newCardDate: null,
  			newCardDescription: null,
      }
    );
  }

  componentDidUpdate() {
    console.log("fin de update");
  }

  //The componentDidMount() method runs after the component output has been rendered to the DOM.
  componentDidMount() {
    console.log("fin de mount");
  }

  //
  componentWillUnmount() {
    console.log("closure item id "+this.props.item.id+" / contenu "+this.props.item.content+" date "+this.props.item.date.toLocaleDateString('fr-FR'));
  }

	render() {
    const modal = this.state.showModal ? (
      <div id="updateItemComponent" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="updateItemComponentLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateItemComponentLabel">Déplacer le jalon #{this.props.item.id}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="newCardDate">Date :</label>
                <input type="date" className="form-control" name="newCardDate" onChange={this.handleInputChange} defaultValue={this.props.item.date.toString()}/>
              </div>
              <div className="form-group">
                <label htmlFor="newCardDescription">Description :</label>
                <textarea className="form-control" rows="5" name="newCardDescription" onChange={this.handleInputChange} defaultValue={this.props.item.content}/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={this.handleHide}>Fermer</button>
              <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Sauvegarder</button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
		return (
      <div id="modalBM" align="right">
        <button className="btn btn-warning btn-xs" type="button" aria-haspopup="true" aria-expanded="false" data-toggle="modal" data-target="#updateItemComponent" id="modal" onClick={this.handleShow}>
          Modifier
        </button>
        {modal}
      </div>
        );
    }
}

class TitleComponent extends React.Component {
  render() {
    return (
      <div className="page-header">
        <h1>Suivi des jalons</h1>
      </div>
    );
  }
}

class TimelineCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseItem = this.handleCloseItem.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  handleCloseItem(event) {
    this.props.closeItem(this.props.item);
    event.preventDefault();
  }

  //https://reactjs.org/docs/handling-events.html
  handleUpdateItem(card) {
    this.props.updateItem(card);
    //this.props.postponeItem(this.props.item);
    card.preventDefault();
  }

  render() {
    var divActionLeftStyle = {
      float: 'left',
    };

    //<div style={divActionLeftStyle}><button className="btn btn-success btn-xs" type="button" aria-haspopup="true" aria-expanded="false" onClick={() => {alert("postpone id "+this.props.item.id.toString())}}>Clore</button></div>
    //<div align="right"><button className="btn btn-warning btn-xs" type="button" aria-haspopup="true" aria-expanded="false" onClick={() => {alert("postpone id "+this.props.item.id.toString())}}>Reporter</button></div>
    return (
      <li className="timeline-item">
        <div className="timeline-badge primary"><i className="glyphicon glyphicon-check"></i></div>
        <div className="timeline-panel" key={this.props.item.id}>
          <div className="timeline-heading">
            <h4 className="timeline-title">{this.props.item.date.toLocaleDateString('fr-FR')} - {this.props.item.id}</h4>
            <div>
              <small className="text-muted">
                <div style={divActionLeftStyle}><button className="btn btn-success btn-xs" type="button" aria-haspopup="true" aria-expanded="false" onClick={this.handleCloseItem}>Clore</button></div>
                <UpdateItemComponent item={this.props.item} updateItem={this.handleUpdateItem}/>
              </small>
              <br/>
            </div>
          </div>
          <div className="timeline-body">
            <p>{this.props.item.content}</p>
          </div>
        </div>
      </li>
  	);
  }

  //FIXME : utiliser les couleurs des glyphicon-check pour gérer le rapprochement des dates
  // si date < date du jour : <div className="timeline-badge danger"><i className="glyphicon glyphicon-check"></i></div>
  // si date < 2 semaines : <div className="timeline-badge warning"><i className="glyphicon glyphicon-check"></i></div>
  // si date < 1 mois : <div className="timeline-badge primary"><i className="glyphicon glyphicon-check"></i></div>
  // si date > 1 mois <div className="timeline-badge success"><i className="glyphicon glyphicon-check"></i></div> ou <div className="timeline-badge"><i className="glyphicon glyphicon-check"></i></div
}

class DeleteItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			showModal: false,
		};
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({showModal: true});
  }
  //masquer la modal
  handleHide() {
    this.setState({showModal: false});
  }

  handleDeleteItem(item, event) {
    alert("super cool cs "+item.id);
    //this.props.deleteItem(item);
    event.preventDefault();
  }



  render() {
    const item = this.props.item;

    const modal = this.state.showModal ? (
      <div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="mi-modal">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Confirmer</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" id="modal-btn-si" onClick={(e) => this.handleDeleteItem(item, e)}>Oui</button>
              <button type="button" className="btn btn-primary" id="modal-btn-no">Non</button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
    return (
      <React.Fragment>
        <a href="#" onClick={this.handleShow}>
          <span className="glyphicon glyphicon-remove gly-red"></span>
        </a>
        {modal}
      </React.Fragment>
    );//fin du return
  }
}

class TableLineComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleDeleteItem(item, event) {
    //alert("super cool cs "+item.id);
    this.props.deleteItem(item);
    event.preventDefault();
  }

  render() {
    const items = this.props.listItems;
    return (
      items.map((item) =>
        <React.Fragment>
          <tr>
            <th scope="row">{item.id}</th>
            <td>{item.date.toLocaleDateString('fr-FR')}</td>
            <td>{item.content}</td>
            <td>{item.actif.toString()}</td>
            <td>
              <a href="#" onClick={(e) => this.handleDeleteItem(item, e)}>
                <span className="glyphicon glyphicon-remove gly-red"></span>
              </a>
            </td>
          </tr>
        </React.Fragment>
      )
    );//fin du return    
    //<DeleteItemComponent item={item}/>
  }
}

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleDeleteItem(item) {
    //alert("TableComponent "+item.id);
    this.props.deleteItem(item);
    event.preventDefault();
  }

  render() {

    return (
      <div className="table">
        <table className="table table-sm">
          <caption>Nombre de jalons en base : {this.props.listItems.length}</caption>
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Jalon</th>
              <th scope="col">Statut</th>
              <th scope="col">Supprimer</th>
              </tr>
          </thead>
          <tbody>
            <TableLineComponent listItems={this.props.listItems} deleteItem={this.handleDeleteItem}/>
          </tbody>
        </table>
      </div>
    );

    /*
    <tbody>
      {
        this.props.listItems.map((item) => {
          return (
            <React.Fragment>
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.date.toLocaleDateString('fr-FR')}</td>
                <td>{item.content}</td>

                <td>{item.actif.toString()}</td>
                <td>BTN CLOTURE</td>
                <td>BTN POSTPONE</td>
              </tr>
            </React.Fragment>
          );
        })
      }
    </tbody>
    */
  }
}

class App extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      items:[], //liste des jalons
    };

    //initialisation des jalons avec le jeu de données.
    //Après à faire avec la recherche de données dans le localStorage
    for( var i = 0; i < dataExample.length; ++i ) {
      var item = {
        id: idGenerator(),
        date: new Date(dataExample[i].date),
        content: dataExample[i].content,
        actif: dataExample[i].actif,
      };

      //console.log("add new item "+ dataExample[i].date + " "+item.actif);
      this.state.items= this.state.items.concat(item).sort((a, b) => new Date(a.date) - new Date(b.date));
    }

      /*BINDING DES FONCTIONS*/
      this.handleNewItem = this.handleNewItem.bind(this);
      this.handleCloseItem = this.handleCloseItem.bind(this);
      this.handleUpdateItem = this.handleUpdateItem.bind(this);
      this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  //Méthode d'ajout d'un nouvel item dans la liste avec rafraichissement de la liste.
  //FIXME : prévoir éventuellement un contrôle du champ date au format MM/DD/YYYY
  //FIXME : sortir la fonction de tri du constructeur et de l'ajout
  handleNewItem(item){
    //alert('passage dans App.addItem');
    var tmp = {
        id: idGenerator(),
        date: new Date(item.cardDate),
        content: item.cardDescription,
        actif: true
    };
    //var listTmp =  this.state.items.sort(); //this.state.listItem.sort((a, b) => new Date(b.date) - new Date(a.date));
    //alert('listTmp date '+new Date(tmp.date)-new Date('11/18/2018'));

    this.setState({
      //listItem: listTmp,
      items: this.state.items.concat(tmp).sort((a, b) => new Date(a.date) - new Date(b.date)),
    });
  }

  //Méthode qui permet de clore un jalon.
  //Le statut du jalon est passé à inactif.
  handleCloseItem(card) {
    console.log("passage dans App.handleCloseItem "+card.id);

    //identifier l'index de l'objet à remplacer en recherchant sur l'id unique de la carte
    var objIndex = this.state.items.findIndex(obj => obj.id === card.id);

    //création d'un nouvel objet sans changer l'item d'origine (immutabilité)
    const closedObj = Object.assign({}, this.state.items[objIndex], {actif: 'false'});
    //avec object spread syntax proposal
    //const updatedObj = { ...this.state.items[objIndex], actif: 'false'};

    //création d'une copie des items avec remplacement de l'objet
    var updatedItems = [
      ...this.state.items.slice(0, objIndex),
      closedObj,
      ...this.state.items.slice(objIndex + 1),
    ];

    //remplacement de la liste par une nouvelle version
    this.setState({items: updatedItems});
  }

  //Méthode qui change les informations d'un jalon
  //on change les informations d'une carte. La liste est mise à jour et triée.
  handleUpdateItem(card) {
    console.log("App.handleUpdateItem item id "+card.id+" / contenu "+card.content+" date "+card.date.toLocaleDateString('fr-FR')+" actif "+card.actif);

    var objIndex = this.state.items.findIndex(obj => obj.id === card.id);

    //création d'un nouvel objet sans changer l'item d'origine (immutabilité)
    const updatedObj = Object.assign({}, this.state.items[objIndex], {content: card.content, date: card.date});
    //avec object spread syntax proposal
    //const updatedObj = { ...this.state.items[objIndex], actif: 'false'};

    //création d'une copie des items avec remplacement de l'objet
    var updatedItems = [
      ...this.state.items.slice(0, objIndex),
      updatedObj,
      ...this.state.items.slice(objIndex + 1),
    ];

    //remplacement de la liste par une nouvelle version
    this.setState(
      {
        items: updatedItems.sort((a, b) => new Date(a.date) - new Date(b.date))
      }
    );
  }

  handleDeleteItem(card) {
    var objIndex = this.state.items.findIndex(obj => obj.id === card.id);

    //création de la copie
    var updatedItems = this.state.items.slice();
    updatedItems.splice(objIndex, 1);//index où se situe l'objet à supprimer et nombre d'objets à supprimer.

    //remplacement de la liste par une nouvelle version
    this.setState(
      {
        items: updatedItems
      }
    );
  }

	render() {
    //construction des cartes
    const listItems = this.state.items;
    //const cardItems = listItems.map((item) =>
    //  <TimelineCard item={item} />
    //);
    const cardItems = listItems.map(function (item) {
      //console.log("item["+item.id+"].actif["+item.actif.toString()+"]")
      if(item.actif.toString() == "true"){
          return <TimelineCard item={item} closeItem={this.handleCloseItem} updateItem={this.handleUpdateItem}/>
      }
    }.bind(this));

    //<div style="display:inline-block;width:100%;overflow-y:auto;">
    var divStyle = {
      display:'inline-block',
      width:'100%',
      overflowY:'auto',
    };

		return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <TitleComponent/>
            <NewCardModalComponent addNewItem={this.handleNewItem}/>
            <div style={divStyle}>
              <ul className="timeline timeline-horizontal">
                <div key={cardItems.id}>{cardItems}</div>
              </ul>
            </div>
          </div>
        </div>
        <hr/>
          <TableComponent listItems={listItems} deleteItem={this.handleDeleteItem}/>
      </div>
    );
  }
}

ReactDOM.render(<App />,document.getElementById('root'));

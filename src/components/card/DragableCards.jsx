import React, { Component } from "react";
import "./user.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const users = [
  {
    firstName: "Alison",
    lastName: "Burger",
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=688&q=80",
  },
  {
    firstName: "Michael",
    lastName: "Cooley",
    avatar:
      "https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
  },
  {
    firstName: "Brook",
    lastName: "Brown",
    avatar:
      "https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
  },
  {
    firstName: "Sara",
    lastName: "Nelson",
    avatar:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80",
  },
  {
    firstName: "Alex",
    lastName: "Marks",
    avatar:
      "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=712&q=80",
  },
  {
    firstName: "Simon",
    lastName: "Jimenez",
    avatar:
      "https://images.unsplash.com/photo-1542973748-658653fb3d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80",
  },
];

class UsersPage extends Component {
  state = { users: users };

  onDragEnd = (result) => {
    const { destination, source, reason } = result;
    // Not a thing to do...
    if (!destination || reason === "CANCEL") {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const users = Object.assign([], this.state.users);

    const droppedUser = this.state.users[source.index];

    users.splice(source.index, 1);

    users.splice(destination.index, 0, droppedUser);
    this.setState({
      users,
    });
  };

  renderUsers = (item, index) => {
    return (
      <Draggable key={index} draggableId={index + " "} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="item">
              <div>{index + 1}</div>
              <div>
                <img src={item.avatar} alt="avatar" />
              </div>
              <div className="name">
                <div>{item.firstName}</div>
                <div>{item.lastName}</div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  };
  render() {
    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="container mt-5">
            <div className="users">
              <h1 className="mx-auto">Users Details</h1>
              <Droppable droppableId="dp1">
                {(provided) => (
                  <div
                    ref={provided.innerRef}

                  // {...provided.droppableProps}
                  >
                    {this.state.users.map(this.renderUsers)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </>
    );
  }
}

export default UsersPage;

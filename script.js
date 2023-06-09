class Node {
  constructor(id) {
    this.id = id;
  }

  receive_message(sender_id, message) {
    const outputElement = document.getElementById("output");
    const messageText = `Node ${this.id} received a message from Node ${sender_id}: ${message}`;
    outputElement.textContent += messageText + "\n";
  }

  send_message(receiver_id, message) {
    network.send_message(this.id, receiver_id, message);
  }
}

class Network {
  constructor(num_nodes) {
    this.nodes = {};

    for (let i = 0; i < num_nodes; i++) {
      const node = new Node(i);
      this.nodes[i] = node;
    }
  }

  send_message(sender_id, receiver_id, message) {
    if (sender_id in this.nodes && receiver_id in this.nodes) {
      this.nodes[receiver_id].receive_message(sender_id, message);
    } else {
      const outputElement = document.getElementById("output");
      outputElement.textContent += "Invalid sender or receiver ID.\n";
    }
  }

  call_and_response() {
    for (const sender_id in this.nodes) {
      const sender_node = this.nodes[sender_id];

      for (const receiver_id in this.nodes) {
        const receiver_node = this.nodes[receiver_id];

        if (sender_id !== receiver_id) {
          const message = `Hello from Node ${sender_id}!`;
          sender_node.send_message(receiver_id, message);
        }
      }
    }
  }
}

const network = new Network(5000000);
network.call_and_response();



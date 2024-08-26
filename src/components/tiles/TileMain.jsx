import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "./Guide.css";

const TileMain = () => {
  useEffect(() => {
    Prism.highlightAll(); // Highlight all code blocks
  }, []);

  return (
    <div className="guide-container">
      <h1>Comprehensive Step-by-Step Guide: Hosting CloudDBeaver on AWS</h1>

 <div className="details-container">
        <details>
          <summary>Step 1: Set Up Your AWS Account and EC2 Instance</summary>
          <div className="guide-content">
            <h3>1. Log in to AWS Console</h3>
            <p>
              <strong>What it is:</strong> The AWS Management Console is your
              primary interface for managing AWS services.
            </p>
            <p>
              <strong>Why it’s needed:</strong> You’ll need access to the AWS
              Management Console to create and manage your EC2 instance and other
              resources.
            </p>
            <p>
              <strong>How to do it:</strong> Visit{" "}
              <a href="https://aws.amazon.com/console/" target="_blank" rel="noreferrer">
                AWS Management Console
              </a>{" "}
              and log in with your credentials. If you don’t have an account, you
              can create one and follow the on-screen instructions to set it up.
            </p>
  
            <h3>2. Select a Region</h3>
            <p>
              <strong>What it is:</strong> AWS regions are geographically isolated
              locations where AWS data centers are hosted.
            </p>
            <p>
              <strong>Why it’s needed:</strong> Choosing a region close to your
              location reduces latency, making your services more responsive.
            </p>
            <p>
              <strong>How to do it:</strong> After logging in, look at the
              top-right corner of the AWS Console, next to your account name, and
              click the dropdown to select the region closest to you.
            </p>
            <details>
              <summary>Potential Issues</summary>
              <p>Selecting a distant region could result in slower access times to your services.</p>
            </details>
  
            <h3>3. Launch an EC2 Instance</h3>
            <p>
              <strong>What it is:</strong> An EC2 instance is a virtual server in
              the AWS cloud where you’ll run CloudDBeaver.
            </p>
            <p>
              <strong>Why it’s needed:</strong> The EC2 instance will host the
              CloudDBeaver application, allowing you to manage your databases via
              a web interface.
            </p>
            <p>
              <strong>How to do it:</strong> Follow these steps to launch your EC2
              instance:
            </p>
            <ol>
              <li>Navigate to EC2 under the "Compute" section in the AWS Console.</li>
              <li>Click "Launch Instance" and assign a name to your instance.</li>
              <li>Select "Ubuntu Server 22.04 LTS" as the Amazon Machine Image (AMI).</li>
              <li>Select `t3.micro` as the instance type.</li>
              <li>Create and download a key pair for SSH access.</li>
              <li>Configure your security group with the necessary rules.</li>
            </ol>
            <details>
              <summary>Potential Issues</summary>
              <p>Ensure that you select the correct AMI and properly configure the security group to avoid connectivity issues.</p>
            </details>
  
            <h3>4. Configure Key Pair</h3>
            <p>
              <strong>What it is:</strong> A key pair is used for SSH (secure
              shell) access to your instance. It's essential for secure
              communication with your instance.
            </p>
            <p>
              <strong>Why it’s needed:</strong> Without a key pair, you won’t be
              able to log into your EC2 instance securely.
            </p>
            <p>
              <strong>How to do it:</strong>
            </p>
            <ol>
              <li>In the "Key pair (login)" section, create a new key pair by clicking "Create a new key pair".</li>
              <li>Choose the key pair type as RSA, and select .pem for the file format.</li>
              <li>Download the .pem file to your computer and store it in a safe location. You’ll use this file to SSH into your instance.</li>
            </ol>
            <p>
              <strong>Where to Find the Public IP:</strong> You can find the
              public IP of your instance in the EC2 dashboard under the
              "Instances" section. Look for the "Public IPv4 address" column.
            </p>
          </div>
        </details>
  
        <details>
          <summary>Step 2: Update the System and Install Docker</summary>
          <div className="guide-content">
            <h3>1. Update the Package List</h3>
            <p>
              <strong>What it is:</strong> Updating the package list ensures that
              your system’s package manager knows about the latest versions of
              software available.
            </p>
            <p>
              <strong>Why it’s needed:</strong> Running updates ensures that your
              system is secure and has the latest software improvements and
              patches.
            </p>
            <p>
              <strong>How to do it:</strong> Run these commands on your EC2
              instance to ensure your system is up to date:
            </p>
            <pre>
              <code className="language-bash">{`sudo apt update\nsudo apt upgrade -y`}</code>
            </pre>
            <details>
              <summary>Kernel Upgrade Notification</summary>
              <p>
                <strong>Why it happens:</strong> Sometimes, upgrading the system
                requires updating the Linux kernel, which necessitates a reboot.
              </p>
              <p>
                <strong>How to resolve:</strong> If a kernel upgrade is required,
                you'll need to reboot your EC2 instance (not your local computer)
                using:
              </p>
              <pre>
                <code className="language-bash">{`sudo reboot`}</code>
              </pre>
              <p>
                <strong>Note:</strong> This step reboots your EC2 instance, not your local machine. After rebooting, you will need to reconnect via SSH.
              </p>
            </details>
  
            <h3>2. Install Docker</h3>
            <p>
              <strong>What it is:</strong> Docker is a platform that uses
              containerization to run applications in isolated environments.
            </p>
            <p>
              <strong>Why it’s needed:</strong> Docker allows you to run
              CloudDBeaver in a container, ensuring consistency across
              environments.
            </p>
            <p>
              <strong>How to do it:</strong> Install Docker on your EC2 instance
              with the following command:
            </p>
            <pre>
              <code className="language-bash">{`sudo apt install docker.io -y`}</code>
            </pre>
            <p>Enable and start Docker:</p>
            <pre>
              <code className="language-bash">
                {`sudo systemctl start docker\nsudo systemctl enable docker`}
              </code>
            </pre>
            <details>
              <summary>Verify Installation</summary>
              <pre>
                <code className="language-bash">{`docker --version`}</code>
              </pre>
              <p>
                <strong>What to Expect:</strong> You should see a version number
                output indicating that Docker is installed and running.
              </p>
            </details>
  
            <h3>3. Install Docker Compose</h3>
            <p>
              <strong>What it is:</strong> Docker Compose is a tool for defining
              and running multi-container Docker applications.
            </p>
            <p>
              <strong>Why it’s needed:</strong> Docker Compose simplifies managing
              multi-container applications, like CloudDBeaver, by using a YAML
              file for configuration.
            </p>
            <p>
              <strong>How to do it:</strong> Install Docker Compose on your EC2
              instance:
            </p>
            <pre>
              <code className="language-bash">
                {`sudo curl -L "https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`}
              </code>
            </pre>
            <p>Make it executable:</p>
            <pre>
              <code className="language-bash">{`sudo chmod +x /usr/local/bin/docker-compose`}</code>
            </pre>
            <details>
              <summary>Verify Installation</summary>
              <pre>
                <code className="language-bash">{`docker-compose --version`}</code>
              </pre>
              <p>
                <strong>What to Expect:</strong> You should see a version number
                output indicating that Docker Compose is installed and ready to
                use.
              </p>
            </details>
          </div>
        </details>
  
        <details>
          <summary>Step 3: Set Up CloudDBeaver Using Docker Compose</summary>
          <div className="guide-content">
            <h3>1. Create a Directory for CloudDBeaver</h3>
            <p>
              <strong>What it is:</strong> Creating a dedicated directory for
              CloudDBeaver helps organize files and configurations.
            </p>
            <p>
              <strong>Why it’s needed:</strong> Organizing files and
              configurations in a dedicated directory ensures your setup is clean
              and manageable.
            </p>
            <p>
              <strong>How to do it:</strong> Create a directory and navigate into
              it:
            </p>
            <pre>
              <code className="language-bash">{`mkdir ~/clouddbeaver\ncd ~/clouddbeaver`}</code>
            </pre>
  
            <h3>2. Create a Docker Compose File</h3>
            <p>
              <strong>What it is:</strong> The Docker Compose file defines the
              configuration for running CloudDBeaver, including the Docker image,
              ports, and environment variables.
            </p>
            <p>
              <strong>Why it’s needed:</strong> This file allows Docker Compose to
              manage the CloudDBeaver service easily.
            </p>
            <p>
              <strong>How to do it:</strong> Edit the `docker-compose.yml` file:
            </p>
            <pre>
              <code className="language-bash">{`nano docker-compose.yml`}</code>
            </pre>
            <p>Add the following configuration:</p>
            <pre>
              <code className="language-yaml">{`version: '3'\n\nservices:\n  clouddbeaver:\n    image: dbeaver/cloudbeaver:latest\n    ports:\n      - "8978:8978"\n    environment:\n      - CB_SERVER_NAME=CloudDBeaver\n    volumes:\n      - clouddbeaver-data:/opt/cloudbeaver/workspace\n    restart: unless-stopped\n\nvolumes:\n  clouddbeaver-data:`}</code>
            </pre>
            <p>
              <strong>Explanation:</strong> This file defines the CloudDBeaver
              service, including the image, ports, environment variables, and
              volumes. The `restart: unless-stopped` option ensures the container
              restarts if it crashes.
            </p>
  
            <h3>3. Start CloudDBeaver</h3>
            <p>
              <strong>What it is:</strong> Starting the CloudDBeaver service will
              launch the application in a Docker container.
            </p>
            <p>
              <strong>Why it’s needed:</strong> This step will make CloudDBeaver
              available via a web interface, accessible from your browser.
            </p>
            <p>
              <strong>How to do it:</strong> Use Docker Compose to start
              CloudDBeaver:
            </p>
            <pre>
              <code className="language-bash">{`sudo docker-compose up -d`}</code>
            </pre>
            <details>
              <summary>Verify that the Container is Running</summary>
              <pre>
                <code className="language-bash">{`sudo docker ps`}</code>
              </pre>
              <p>
                <strong>What to Expect:</strong> You should see the CloudDBeaver
                container running with the port `8978` mapped.
              </p>
              <details>
                <summary>Check Logs if Necessary</summary>
                <pre>
                  <code className="language-bash">{`sudo docker logs clouddbeaver-clouddbeaver-1`}</code>
                </pre>
                <p>
                  <strong>Why Check Logs:</strong> Logs help troubleshoot any
                  issues during the startup process.
                </p>
              </details>
            </details>
          </div>
        </details>
  
        <details>
          <summary>Step 4: Access CloudDBeaver</summary>
          <div className="guide-content">
            <h3>Open CloudDBeaver in a Web Browser</h3>
            <p>
              <strong>What it is:</strong> The CloudDBeaver web interface is where
              you’ll manage your databases.
            </p>
            <p>
              <strong>Why it’s needed:</strong> This step allows you to interact
              with CloudDBeaver, set up your databases, and start managing them
              through a web browser.
            </p>
            <p>
              <strong>How to do it:</strong> Navigate to the following URL in your
              browser:
            </p>
            <pre>
              <code className="language-none">{`http://your-ec2-public-ip:8978`}</code>
            </pre>
            <p>
              <strong>What to Expect:</strong> You should see the CloudDBeaver
              setup wizard.
            </p>
            <details>
              <summary>Potential Issues: Unable to Connect</summary>
              <p>
                If the page doesn’t load, ensure that your security group allows
                inbound traffic on port `8978`.
              </p>
              <h4>Double-Check Security Group Settings:</h4>
              <p>
                Access the security group associated with your EC2 instance via
                the AWS Console. In the "Inbound rules" tab, ensure there’s a rule
                for `Custom TCP` with `Port Range` set to `8978` and `Source` set
                to `0.0.0.0/0`.
              </p>
              <h4>Ensure the CloudDBeaver Container is Running:</h4>
              <p>
                Use the following command to check if the container is running:
              </p>
              <pre>
                <code className="language-bash">{`sudo docker ps`}</code>
              </pre>
            </details>
            <details>
              <summary>Network Connectivity Issues</summary>
              <p>
                If you can’t reach the EC2 instance, ensure your network settings
                allow outgoing traffic to port `8978`. You can also use tools like
                `ping` and `telnet` to troubleshoot connectivity.
              </p>
            </details>
          </div>
        </details>
  
        <details>
          <summary>Step 5: Finalize CloudDBeaver Setup</summary>
          <div className="guide-content">
            <h3>Complete the Setup Wizard</h3>
            <p>
              <strong>What it is:</strong> The setup wizard will guide you through
              the final configuration steps to get CloudDBeaver ready for use.
            </p>
            <p>
              <strong>Why it’s needed:</strong> Completing the setup wizard is
              necessary to initialize CloudDBeaver and start managing your
              databases.
            </p>
            <p>
              <strong>How to do it:</strong> Follow the on-screen instructions in
              the CloudDBeaver web interface to complete the setup.
            </p>
            <p>
              <strong>What to Expect:</strong> Once the setup is complete, you'll
              be taken to the CloudDBeaver dashboard where you can start managing
              your databases.
            </p>
          </div>
        </details>
 </div>
    </div>
  );
};

export default TileMain;

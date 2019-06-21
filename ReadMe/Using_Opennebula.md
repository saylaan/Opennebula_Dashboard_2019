# SandboxALE-AAPP_2019
How to user Opennebula npm in Sandbox

sudo npm install --save opennebula

In server/src/app.js
const opennebula = require('opennebula')
const one = new Opennebula('geoffroy:2961Sailaan1992!', 'http://vlab.ale-aapp.com:2633/RPC2')
one.getHosts(function(err, data) {
  console.log('Trying to get all hosts')
  console.log(data)
})

All cmd to use for the projetct with how to

Config :
one.version(callback)
one.config(callback)

Get Singleton:
one.getVM(id)
one.getTemplate(id)
one.getUser(id)
one.getGroup(id)
one.getVNet(id)

Get Multiple:
one.getGroups(callback) ++
one.getUsers(callback) ++
one.getVNets(callback, userFilter, startID, endID) ++
one.getTemplates(callback, userFilter, startID, endID) ++
one.getVMs(callback, userFilter, startID, endID, stateFilter) ++
<!-- one.getClusters(callback) ++ -->
<!-- one.getImages(callback, userFilter, startID, endID) +- -->

Info:
vm.info(callback)
user.info(callback)
vnet.info(callback)
template.info(callback)
group.info(callback)

Delete:
template.delete(callback) ++
user.delete(callback) ++
vnet.delete(callback) ++

Create:
one.createVM(template, state, callback)
one.createTemplate(template, callback)
one.createVNet(template, cluster, callback)
one.createUser(username, password, driver, callback)
one.login(username, token, period, callback)


VM (Id, Name, Owner(++), Group(?), Status(++), IP(++)):
vm.action(action, callback) ++
vm.deploy(host, datastore, enforce, callback) ++
vm.diskSnapshot(disk, name, type, imed, clone, callback) ++
vm.attachDisk(disk, callback) ++
vm.detachDisk(disk, callback) ++
vm.attachNIC(template, callback) ++
vm.detachNIC(nicid, callback) ++
vm.chown(owner, callback) ++
vm.rename(name, callback) ++
vm.createSnapshot(name, callback) ++
vm.deleteSnapshot(name, callback) ++
vm.snapshotrevert(snapshot, callback) ++
vm.resize(template, enforce, callback) ++
vm.update(template, replace, callback) ++
vm.saveAsDisk(disk, imagename, imagetype, snapshot, callback) ++
vm.createDiskSnapshot(disk, snapshot, callback) ++
vm.updateConf(template, callback) ++
vm.revertDiskSnapshot(disk, snapshot, callback) ++
vm.deleteDiskSnapshot(disk, snapshot, callback) ++
vm.lock(level, callback) ++
vm.unlock(callback) ++

Group (Name / ID / nbUer / VMs / Mem / CPU) : users / vlab / oneadmin
group.addProvider(group, zone, cluster, callback) ++
group.delProvider(group, zone, cluster, callback) ++
group.update(content, whole, callback) ?

Host (ID / Name / Host Usage) : sk12kvm / sk11kvm
host.update(template, merge, callback) +-
host.rename(name, callback) +-

User (Id, Name, Group, Token) : admin / vlab / server-oneadmin
user.chgrp(group, callback) ++
user.passwd(password, callback) ++
user.addgroup(group, callback) ++
user.delgroup(group, callback) ++
user.update(content, whole, callback) +-

Cluster (Id, Name, Hosts, Vnets, Datastore):
cluster.addVnet(vnet, callback) ++
cluster.delVnet(vnet, callback) ++

Template (Id, Name, Owner(?), Group, Template(++)) :
template.instantiate(name, state, template, callback) ++
template.update(content, whole, callback) +-
template.rename(name, callback) +-

VNet (Id, Name, Owner, Group): all Vlabs with adress VMs and own IP
vnet.update(content, whole, callback) ++
vnet.addRange(content, callback) ++
vnet.delRange(range, callback) ++
vnet.freeRange(range, callback) -+
vnet.reserve(template, callback) -+
vnet.rename(name, callback) +-
vnet.chown(owner, callback) --
vnet.chgrp(group, callback) --

<!-- Maybe not use =========================================================================
one.createCluster(name, callback) --
one.createHost(hostname, immad, vmmad, vnmad, cluster, callback) --
one.createGroup(name, callback) --
one.createImage(template, datastore, callback) --
one.getHost(id)
one.getHosts(callback) ++
one.getImage(id)
one.getCluster(id)
cluster.info(callback)
host.info(callback)
image.info(callback)
cluster.delete(callback)
host.delete(callback)
group.delete(callback) --
image.delete(callback) ++
Enable / Disable / Lock:
host.enable(callback)
host.disable(callback)
image.enable(callback) +-
image.disable(callback) +-
image.unlock(callback) +-

vm.monitoring(callback) --
vm.chgrp(group, callback) --
vm.chmod(user_use, user_manage, user_admin, group_use, group_manage, group_admin, other_use, other_manage, other_admin, callback) --
vm.recover(recover, callback) --
vm.migrate(host, live, enforce, datastore, callback) --
group.quota(template, callback) --
allocate(hostname, manager, vm, cluster, callback) --
setStatus(status, callback) --
user.chauth(driver, password, callback) --
user.quota(template, callback) --
cluster.update(content, whole, callback) --
cluster.rename(name, callback) --
cluster.addHost(host, callback) --
cluster.delHost(host, callback) --
cluster.addDatastore(datastore, callback) --
cluster.delDatastore(datastore, callback) --
template.clone(name, callback) --
template.chown(owner, callback) --
template.chgrp(group, callback) --
template.chmod(user_use, user_manage, user_admin, group_use, group_manage, group_admin, other_use, other_manage, other_admin, callback) --
vnet.updateRange(template, callback) --
vnet.hold(template, callback) --
vnet.release(template, callback) --
vnet.chmod(user_use, user_manage, user_admin, group_use, group_manage, group_admin, other_use, other_manage, other_admin, callback) -- -->

<!-- No Use ================================================================================
 one.createDatastore(template, cluster, callback)
Image (Id, Name, Owner(?), Group(?)):
image.update(content, whole, callback) --
image.clone(name, callback) --
image.chown(owner, callback) --
image.chgrp(group, callback) --
image.chmod(user_use, user_manage, user_admin, group_use, group_manage, group_admin, other_use, other_manage, other_admin, callback) --
image.rename(name, callback) +-
image.persistent(persistent, callback) +-
image.chtype(type, callback) --
image.lock(level, callback) +-
one.createZone(template, callback)
one.createDocument(template, type, callback)
document.delete(callback)
datastore.delete(callback)
zone.delete(callback)
one.getDatastore(id)
one.getZone(id)
one.getDocument(id)
one.getDatastores(callback) +
one.getZones(callback)
datastore.info(callback)
document.info(callback)
zone.info(callback) -->
<!-- Datastore
datastore.update(content, whole, callback)
datastore.chown(owner, callback)
datastore.chgrp(group, callback)
datastore.chmod(user_use, user_manage, user_admin, group_use, group_manage, group_admin, other_use, other_manage, other_admin, callback)
datastore.rename(name, callback) -->
<!-- Document
document.update(content, whole, callback)
document.clone(name, callback)
document.chown(owner, callback)
document.chgrp(group, callback)
document.chmod(user_use, user_manage, user_admin, group_use, group_manage, group_admin, other_use, other_manage, other_admin, callback)
document.rename(name, callback) -->
<!-- Zone
zone.update(content, whole, callback)
zone.rename(name, callback) -->
